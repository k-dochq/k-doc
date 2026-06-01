'use client';

import { useEffect, useRef } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useKdocMessages, useSendKdocMessage, kdocChatKeys, type KdocMessage } from 'lib/queries/kdoc-chat';

export type { KdocMessage };

interface UseKdocRealtimeChatProps {
  threadId: string | null;
}

const supabase = createClient();

export function useKdocRealtimeChat({ threadId }: UseKdocRealtimeChatProps) {
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // 메시지 히스토리 (TanStack Query)
  const { data: messages = [], isLoading } = useKdocMessages(threadId);

  // 메시지 전송 (TanStack Mutation)
  const { mutateAsync: sendMessageMutation } = useSendKdocMessage(threadId);

  const sendMessage = async (content: string) => {
    if (!threadId || !content.trim()) return;

    // 낙관적 업데이트: 전송 전 즉시 UI에 표시
    const optimistic: KdocMessage = {
      id: crypto.randomUUID(),
      threadId,
      senderType: 'USER',
      content: content.trim(),
      adminName: null,
      isRead: false,
      readAt: null,
      createdAt: new Date().toISOString(),
    };

    queryClient.setQueryData<KdocMessage[]>(
      kdocChatKeys.messages(threadId),
      (prev) => (prev ? [...prev, optimistic] : [optimistic]),
    );

    try {
      await sendMessageMutation(content);
    } catch {
      // 실패 시 낙관적 업데이트 롤백
      queryClient.setQueryData<KdocMessage[]>(
        kdocChatKeys.messages(threadId),
        (prev) => (prev ?? []).filter((m) => m.id !== optimistic.id),
      );
    }
  };

  // Postgres Changes 구독 — admin 메시지 실시간 수신
  useEffect(() => {
    if (!threadId) return;

    const channel = supabase
      .channel(`kdoc-chat-${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'KdocChatMessage',
          filter: `threadId=eq.${threadId}`,
        },
        (payload) => {
          const newMsg = payload.new as KdocMessage;
          queryClient.setQueryData<KdocMessage[]>(
            kdocChatKeys.messages(threadId),
            (prev) => {
              if (!prev) return [newMsg];
              // 낙관적 업데이트와 중복 제거
              const isDuplicate = prev.some(
                (m) =>
                  m.senderType === newMsg.senderType &&
                  m.content === newMsg.content &&
                  Math.abs(
                    new Date(m.createdAt).getTime() - new Date(newMsg.createdAt).getTime(),
                  ) < 3000,
              );
              if (isDuplicate) {
                return prev.map((m) =>
                  m.senderType === newMsg.senderType &&
                  m.content === newMsg.content &&
                  m.id !== newMsg.id
                    ? newMsg
                    : m,
                );
              }
              return [...prev, newMsg];
            },
          );
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [threadId, queryClient]);

  return { messages, isLoading, sendMessage };
}

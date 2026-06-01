'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type RealtimeChannel } from '@supabase/supabase-js';

export interface KdocMessage {
  id: string;
  threadId: string;
  senderType: 'USER' | 'ADMIN';
  content: string;
  adminName: string | null;
  isRead: boolean | null;
  readAt: string | null;
  createdAt: string;
}

interface UseKdocRealtimeChatProps {
  threadId: string | null;
}

const supabase = createClient();

export function useKdocRealtimeChat({ threadId }: UseKdocRealtimeChatProps) {
  const [messages, setMessages] = useState<KdocMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // 메시지 히스토리 로드
  const loadHistory = useCallback(async () => {
    if (!threadId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kdoc-chat/thread/${threadId}/messages?limit=50`);
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (e) {
      setError('메시지를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [threadId]);

  // 메시지 전송 (낙관적 업데이트)
  const sendMessage = useCallback(async (content: string) => {
    if (!threadId || !content.trim()) return;

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

    setMessages((prev) => [...prev, optimistic]);

    try {
      const res = await fetch(`/api/kdoc-chat/thread/${threadId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!data.success) {
        // 낙관적 업데이트 롤백
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
        setError('메시지 전송에 실패했습니다.');
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setError('메시지 전송에 실패했습니다.');
    }
  }, [threadId]);

  // Postgres Changes 구독
  useEffect(() => {
    if (!threadId) return;

    loadHistory();

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
          setMessages((prev) => {
            // 낙관적 업데이트와 중복 제거 (content + senderType 기준)
            const isDuplicate = prev.some(
              (m) =>
                m.senderType === newMsg.senderType &&
                m.content === newMsg.content &&
                Math.abs(new Date(m.createdAt).getTime() - new Date(newMsg.createdAt).getTime()) < 3000,
            );
            if (isDuplicate) {
              return prev.map((m) =>
                m.senderType === newMsg.senderType &&
                m.content === newMsg.content &&
                m.id !== newMsg.id
                  ? { ...newMsg }
                  : m,
              );
            }
            return [...prev, newMsg];
          });
        },
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
      setIsConnected(false);
    };
  }, [threadId, loadHistory]);

  return { messages, isLoading, isConnected, error, sendMessage };
}

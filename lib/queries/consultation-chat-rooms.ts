'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';

export const chatRoomsQueryKey = ['consultation', 'chat-rooms'] as const;

export async function fetchChatRooms(): Promise<ChatRoom[]> {
  const response = await fetch('/api/consultation/chat-rooms');

  if (!response.ok) {
    throw new Error('Failed to fetch chat rooms');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch chat rooms');
  }

  return result.data;
}

export function useChatRooms({ enabled = true }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: chatRoomsQueryKey,
    queryFn: fetchChatRooms,
    enabled,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: true,
    staleTime: 0,
  });
}

async function postMarkAllAsRead(hospitalId: string): Promise<{ updated: number }> {
  const response = await fetch('/api/chat/mark-all-as-read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hospitalId }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Failed to mark all as read');
  return { updated: data.updated ?? 0 };
}

async function postMarkAsRead(params: {
  messageId: string;
  hospitalId: string;
}): Promise<{ updated: number }> {
  const response = await fetch('/api/chat/mark-as-read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!data.success) throw new Error(data.error || 'Failed to mark as read');
  return { updated: data.updated ?? 0 };
}

/** 채팅방 진입 시 해당 방의 모든 unread admin 메시지를 일괄 읽음 처리 */
export function useMarkAllChatMessagesAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hospitalId: string) => postMarkAllAsRead(hospitalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatRoomsQueryKey });
    },
  });
}

/** 실시간으로 도착한 개별 admin 메시지를 읽음 처리 */
export function useMarkChatMessageAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postMarkAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatRoomsQueryKey });
    },
  });
}

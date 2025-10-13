'use client';

import { useQuery } from '@tanstack/react-query';
import { type ChatRoom } from '@/app/api/consultation/chat-rooms/route';

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

export function useChatRooms() {
  return useQuery({
    queryKey: ['consultation', 'chat-rooms'],
    queryFn: fetchChatRooms,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: true,
    staleTime: 0,
  });
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Prisma, SenderType } from '@prisma/client';
import { queryKeys } from 'shared/lib/query-keys';

// Prisma 타입 활용
type ConsultationMessage = {
  id: string;
  userId: string;
  hospitalId: string;
  senderType: SenderType; // Prisma enum 타입 사용
  content: string;
  createdAt: Date;
  User?: {
    id: string;
    displayName: string | null;
    name: string | null;
  };
};

interface UseConsultationChatProps {
  hospitalId: string;
  userId?: string;
}

// API 함수들
const fetchMessages = async (
  hospitalId: string,
  userId: string,
): Promise<ConsultationMessage[]> => {
  const response = await fetch(
    `/api/consultation-messages?hospitalId=${hospitalId}&userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  const result = await response.json();
  return result.data || [];
};

const sendMessage = async (data: {
  hospitalId: string;
  content: string;
  senderType?: SenderType; // Prisma enum 타입 사용
}) => {
  const response = await fetch('/api/consultation-messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};

export function useConsultationChat({ hospitalId, userId }: UseConsultationChatProps) {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // 메시지 조회 (polling 방식)
  const {
    data: messages = [],
    isLoading,
    refetch,
    error: queryError,
  } = useQuery<ConsultationMessage[], Error>({
    queryKey: queryKeys.consultationMessages.list(hospitalId, userId!),
    queryFn: () => fetchMessages(hospitalId, userId!),
    enabled: !!userId && !!hospitalId,
    refetchInterval: 3000, // 3초마다 polling
    refetchIntervalInBackground: true, // 백그라운드에서도 polling
    staleTime: 1000, // 1초 후 stale 상태
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // 에러 처리
  useEffect(() => {
    if (queryError) {
      console.error('Error fetching messages:', queryError);
      setError(queryError.message || 'Failed to fetch messages');
    } else {
      setError(null);
    }
  }, [queryError]);

  // 메시지 전송
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) =>
      sendMessage({ hospitalId, content, senderType: SenderType.USER }),
    onSuccess: () => {
      // 메시지 전송 후 즉시 새로고침
      queryClient.invalidateQueries({
        queryKey: queryKeys.consultationMessages.list(hospitalId, userId!),
      });
    },
    onError: (err) => {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    },
  });

  const handleSendMessage = useCallback(
    (content: string) => {
      if (content.trim()) {
        sendMessageMutation.mutate(content);
      }
    },
    [sendMessageMutation],
  );

  return {
    messages,
    isLoading,
    isConnected: true, // polling 방식에서는 항상 연결된 것으로 간주
    error,
    sendMessage: handleSendMessage,
    refetch,
    isSending: sendMessageMutation.isPending,
  };
}

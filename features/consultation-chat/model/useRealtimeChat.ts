'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type RealtimeChannel } from '@supabase/supabase-js';
import { type ChatMessage } from '../api/entities/types';
import { fetchChatHistory, sendChatMessage, saveMessageToDatabase } from '../api/chat-api-client';
import {
  createRoomId,
  sortMessagesByTime,
  deduplicateMessages,
  validateMessage,
  createChannelName,
} from '../lib/chat-utils';

// 훅 외부에서 한 번만 생성
const supabase = createClient();

interface UseRealtimeChatProps {
  hospitalId: string;
  userId: string;
  userName: string;
}

export function useRealtimeChat({ hospitalId, userId, userName }: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);

  // 채팅 히스토리 로드
  const loadChatHistory = useCallback(async () => {
    if (!userId || !hospitalId) {
      setIsLoadingHistory(false);
      return;
    }

    try {
      setIsLoadingHistory(true);
      setError(null);

      const {
        messages: page,
        hasMore,
        nextCursor,
      } = await fetchChatHistory(hospitalId, {
        limit: 50,
      });
      const sortedMessages = sortMessagesByTime(page);
      setMessages(sortedMessages);
      setHasMore(hasMore);
      setNextCursor(nextCursor);
    } catch (error) {
      console.error('❌ Failed to load chat history:', error);
      setError('채팅 히스토리를 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingHistory(false);
    }
  }, [hospitalId, userId]);

  const loadMoreHistory = useCallback(async () => {
    if (!userId || !hospitalId) return;
    if (!hasMore || !nextCursor) return;
    try {
      setError(null);
      const {
        messages: page,
        hasMore: more,
        nextCursor: cursor,
      } = await fetchChatHistory(hospitalId, { limit: 50, cursor: nextCursor });
      setMessages((prev) => sortMessagesByTime([...page, ...prev]));
      setHasMore(more);
      setNextCursor(cursor);
    } catch (error) {
      console.error('❌ Failed to load more chat history:', error);
      setError('이전 메시지를 불러오는데 실패했습니다.');
    }
  }, [hospitalId, userId, hasMore, nextCursor]);

  const handleAutoResponse = useCallback(
    async ({ message: autoMessage }: { message: string }) => {
      const adminMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: autoMessage,
        userId,
        userName,
        timestamp: new Date().toISOString(),
        type: 'admin',
      };

      setMessages((prev) => {
        const combined = [...prev, adminMessage];
        const deduplicated = deduplicateMessages(combined);
        return sortMessagesByTime(deduplicated);
      });

      const saveResult = await saveMessageToDatabase(hospitalId, autoMessage, 'ADMIN');
      if (!saveResult.success) {
        console.error('❌ Failed to save auto response message:', saveResult.error);
      }
    },
    [userId, userName, hospitalId],
  );

  // 메시지 전송
  const sendMessage = useCallback(
    async (content: string) => {
      if (!channelRef.current || !userId) {
        return;
      }

      // 메시지 검증
      const validation = validateMessage(content);
      if (!validation.isValid) {
        setError(validation.error || '메시지 검증 실패');
        return;
      }

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        content: content.trim(),
        userId,
        userName,
        timestamp: new Date().toISOString(),
        type: 'user',
      };

      try {
        setError(null);

        // ✅ 1. 즉시 UI에 추가 (낙관적 업데이트)
        setMessages((prev) => {
          const combined = [...prev, message];
          const deduplicated = deduplicateMessages(combined);
          return sortMessagesByTime(deduplicated);
        });

        // ✅ 2. 서버로 전송 (Broadcast + DB)
        const result = await sendChatMessage(
          channelRef.current,
          hospitalId,
          message,
          handleAutoResponse,
        );

        if (!result.success) {
          // ✅ 3. 전송 실패 시 UI에서 제거 (롤백)
          setMessages((prev) => prev.filter((msg) => msg.id !== message.id));
          setError(result.error || '메시지 전송 실패');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        // ✅ 예외 발생 시 UI에서 제거 (롤백)
        setMessages((prev) => prev.filter((msg) => msg.id !== message.id));

        setError(errorMessage);
      }
    },
    [userId, userName, hospitalId, handleAutoResponse],
  );

  // 메시지 상태 업데이트 (중복 제거 및 정렬)
  const updateMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessages((prev) => {
      const combined = [...prev, ...newMessages];
      const deduplicated = deduplicateMessages(combined);
      return sortMessagesByTime(deduplicated);
    });
  }, []);

  useEffect(() => {
    if (!userId || !hospitalId) {
      return;
    }

    const roomId = createRoomId(hospitalId, userId);

    // 1. 먼저 채팅 히스토리 로드
    loadChatHistory();

    // 2. visibilitychange 이벤트 리스너 등록 (임시 주석처리)
    // if (typeof document !== 'undefined') {
    //   document.addEventListener('visibilitychange', handleVisibilityChange);
    // }

    // 2. 채널 생성 및 구독
    const channelName = createChannelName(roomId);
    if (!supabase) {
      console.error('Supabase client 생성 실패');
      return;
    }

    const channel = supabase.channel(channelName, {
      config: {
        broadcast: {
          self: true, // 자신이 보낸 메시지도 수신
        },
      },
    });

    channelRef.current = channel;

    // 메시지 수신
    channel.on('broadcast', { event: 'message' }, ({ payload }: { payload: ChatMessage }) => {
      updateMessages([payload]);
    });

    // 채널 구독
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setIsConnected(true);
        setError(null);
      } else if (status === 'CHANNEL_ERROR') {
        setIsConnected(false);
        setError('채팅방 연결에 실패했습니다.');
      } else if (status === 'TIMED_OUT') {
        setIsConnected(false);
        setError('연결 시간이 초과되었습니다.');
      } else if (status === 'CLOSED') {
        setIsConnected(false);
      }
    });

    // 정리
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      // visibilitychange 이벤트 리스너 제거 (임시 주석처리)
      // if (typeof document !== 'undefined') {
      //   document.removeEventListener('visibilitychange', handleVisibilityChange);
      // }
      setIsConnected(false);
    };
  }, [userId, userName, hospitalId, loadChatHistory, updateMessages]);

  return {
    // 상태
    messages,
    isConnected,
    isLoadingHistory,
    error,
    hasMore,
    nextCursor,

    // 액션
    sendMessage,
    loadMoreHistory,
  };
}

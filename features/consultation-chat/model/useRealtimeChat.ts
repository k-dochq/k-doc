'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type RealtimeChannel } from '@supabase/supabase-js';
import { type ChatMessage, type TypingEvent } from '../api/entities/types';
import { fetchChatHistory, sendChatMessage, sendTypingStatus } from '../api/chat-api-client';
import {
  createRoomId,
  sortMessagesByTime,
  deduplicateMessages,
  validateMessage,
  createChannelName,
  TypingManager,
} from '../lib/chat-utils';

interface UseRealtimeChatProps {
  hospitalId: string;
  userId: string;
  userName: string;
}

export function useRealtimeChat({ hospitalId, userId, userName }: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const supabase = createClient();
  const roomId = createRoomId(hospitalId, userId);
  const typingManager = useRef(new TypingManager());

  // 채팅 히스토리 로드
  const loadChatHistory = useCallback(async () => {
    if (!userId || !hospitalId) {
      setIsLoadingHistory(false);
      return;
    }

    try {
      setIsLoadingHistory(true);
      setError(null);

      const historyMessages = await fetchChatHistory(hospitalId, userId);
      const sortedMessages = sortMessagesByTime(historyMessages);
      setMessages(sortedMessages);
    } catch (error) {
      console.error('❌ Failed to load chat history:', error);
      setError('채팅 히스토리를 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingHistory(false);
    }
  }, [hospitalId, userId]);

  // 메시지 전송
  const sendMessage = useCallback(
    async (content: string) => {
      console.log('🚀 sendMessage called:', { content, roomId, userId, userName, hospitalId });

      if (!channelRef.current || !userId) {
        console.log('❌ sendMessage failed: missing requirements', {
          hasChannel: !!channelRef.current,
          hasUserId: !!userId,
        });
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
        const result = await sendChatMessage(channelRef.current, hospitalId, message);

        if (!result.success) {
          setError(result.error || '메시지 전송 실패');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        console.error('❌ Failed to send message:', error);
      }
    },
    [userId, userName, hospitalId, roomId],
  );

  // 타이핑 상태 전송
  const sendTyping = useCallback(
    async (isTyping: boolean) => {
      if (!channelRef.current || !userId) {
        return;
      }

      try {
        const result = await sendTypingStatus(channelRef.current, userId, userName, isTyping);
        if (!result.success) {
          console.error('❌ Failed to send typing status:', result.error);
        }
      } catch (error) {
        console.error('❌ Error sending typing status:', error);
      }
    },
    [userId, userName],
  );

  // 메시지 상태 업데이트 (중복 제거 및 정렬)
  const updateMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessages((prev) => {
      const combined = [...prev, ...newMessages];
      const deduplicated = deduplicateMessages(combined);
      return sortMessagesByTime(deduplicated);
    });
  }, []);

  // 타이핑 사용자 상태 업데이트
  const updateTypingUsers = useCallback(() => {
    setTypingUsers(typingManager.current.getTypingUsers());
  }, []);

  useEffect(() => {
    if (!roomId || !userId || !hospitalId) {
      console.log('❌ useEffect: missing required params', { roomId, userId, hospitalId });
      return;
    }

    console.log('🔌 Setting up Realtime channel:', { roomId, userId, userName, hospitalId });

    // 1. 먼저 채팅 히스토리 로드
    loadChatHistory();

    // 2. 채널 생성 및 구독
    const channelName = createChannelName(roomId);
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: {
          self: true, // 자신이 보낸 메시지도 수신
        },
      },
    });

    console.log('📡 Channel created:', channelName);
    channelRef.current = channel;

    // 메시지 수신
    channel.on('broadcast', { event: 'message' }, ({ payload }: { payload: ChatMessage }) => {
      console.log('📥 Message received via broadcast:', payload);
      updateMessages([payload]);
    });

    // 타이핑 상태 수신
    channel.on('broadcast', { event: 'typing' }, ({ payload }: { payload: TypingEvent }) => {
      if (payload.userId === userId) return; // 자신의 타이핑은 무시

      if (payload.isTyping) {
        typingManager.current.addTypingUser(payload.userName);
      } else {
        typingManager.current.removeTypingUser(payload.userName);
      }
      updateTypingUsers();
    });

    // 채널 구독
    channel.subscribe((status) => {
      console.log('🔔 Channel subscription status:', status);
      if (status === 'SUBSCRIBED') {
        setIsConnected(true);
        setError(null);
        console.log(`✅ Connected to chat room: ${roomId}`);
      } else if (status === 'CHANNEL_ERROR') {
        setIsConnected(false);
        setError('채팅방 연결에 실패했습니다.');
        console.error(`❌ Failed to connect to chat room: ${roomId}`);
      } else if (status === 'TIMED_OUT') {
        setIsConnected(false);
        setError('연결 시간이 초과되었습니다.');
        console.error(`⏰ Connection timed out for chat room: ${roomId}`);
      } else if (status === 'CLOSED') {
        setIsConnected(false);
        console.log(`🔒 Connection closed for chat room: ${roomId}`);
      }
    });

    // 정리
    return () => {
      console.log('🧹 Cleaning up channel:', channelName);
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
      setIsConnected(false);
      typingManager.current.clear();
      setTypingUsers([]);
    };
  }, [
    roomId,
    userId,
    userName,
    hospitalId,
    supabase,
    loadChatHistory,
    updateMessages,
    updateTypingUsers,
  ]);

  return {
    // 상태
    messages,
    isConnected,
    typingUsers,
    isLoadingHistory,
    error,

    // 액션
    sendMessage,
    sendTyping,
    refreshHistory: loadChatHistory,
    clearError: () => setError(null),

    // 메타데이터
    roomId,
    channelName: createChannelName(roomId),
  };
}

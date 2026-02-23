/**
 * 채팅 API 클라이언트 함수들
 * UI와 독립적인 API 호출 로직
 */

import { type ChatMessage, type CheckBusinessHoursDetectedLanguage } from './entities/types';
import debounce from 'lodash/debounce';

/**
 * 채팅 히스토리 조회
 */
export async function fetchChatHistory(
  hospitalId: string,
  options?: { limit?: number; cursor?: string | null },
): Promise<{ messages: ChatMessage[]; hasMore: boolean; nextCursor: string | null }> {
  try {
    console.log('📚 Fetching chat history for:', { hospitalId });

    const params = new URLSearchParams();
    params.set('hospitalId', hospitalId);
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.cursor) params.set('cursor', options.cursor);

    const response = await fetch(`/api/consultation-messages?${params.toString()}`);

    if (!response.ok) {
      console.log('📚 No chat history found or error loading:', response.status);
      return { messages: [], hasMore: false, nextCursor: null };
    }

    const data = await response.json();

    if (!data.success || !data.messages) {
      console.log('📚 No messages in response');
      return { messages: [], hasMore: false, nextCursor: null };
    }

    const historyMessages: ChatMessage[] = data.messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      userId: msg.userId,
      userName: msg.User?.name || msg.User?.email || '사용자',
      timestamp: msg.createdAt,
      type: msg.senderType === 'USER' ? 'user' : 'admin',
      isRead: msg.isRead ?? undefined,
      readAt: msg.readAt ?? undefined,
    }));

    console.log('📚 Chat history loaded:', historyMessages.length, 'messages');
    return {
      messages: historyMessages,
      hasMore: !!data.hasMore,
      nextCursor: data.nextCursor || null,
    };
  } catch (error) {
    console.error('❌ Failed to fetch chat history:', error);
    return { messages: [], hasMore: false, nextCursor: null };
  }
}

/**
 * 메시지를 데이터베이스에 저장
 */
export async function saveMessageToDatabase(
  hospitalId: string,
  content: string,
  senderType: 'USER' | 'ADMIN' = 'USER',
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('💾 Saving message to database:', { hospitalId, content, senderType });

    const response = await fetch('/api/consultation-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hospitalId,
        content,
        senderType,
        // userId는 서버에서 getCurrentUser()로 자동 추출
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || `HTTP ${response.status}`;
      console.error('❌ Failed to save message to database:', response.status, errorData);
      return { success: false, error: errorMessage };
    }

    const result = await response.json();
    console.log('✅ Message saved to database:', result);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error saving message to database:', error);
    return { success: false, error: errorMessage };
  }
}

/**
 * 비즈니스 시간 체크 API 호출
 */
export interface BusinessHoursCheckResult {
  success: boolean;
  isBusinessHours?: boolean;
  detectedLanguage?: CheckBusinessHoursDetectedLanguage;
  autoResponseMessage?: string;
  error?: string;
}

export async function checkBusinessHours(
  hospitalId: string,
  userId: string,
  message: ChatMessage,
): Promise<BusinessHoursCheckResult> {
  try {
    const response = await fetch('/api/consultation-messages/check-business-hours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hospitalId,
        userId,
        message: {
          id: message.id,
          content: message.content,
          userId: message.userId,
          userName: message.userName,
          timestamp: message.timestamp,
          type: message.type,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || `HTTP ${response.status}`;
      console.error('❌ Failed to check business hours:', response.status, errorData);
      return { success: false, error: errorMessage };
    }

    const result = await response.json();
    return {
      success: true,
      isBusinessHours: result.isBusinessHours,
      detectedLanguage: result.detectedLanguage,
      autoResponseMessage: result.autoResponseMessage,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error checking business hours:', error);
    return { success: false, error: errorMessage };
  }
}

/**
 * 디바운스된 비즈니스 시간 체크 함수
 * 5초 지연 후 마지막 호출만 실행됩니다.
 */
export interface AutoResponseHandlerPayload {
  message: string;
  detectedLanguage?: CheckBusinessHoursDetectedLanguage;
}

type AutoResponseHandler = (payload: AutoResponseHandlerPayload) => Promise<void> | void;

interface DebouncedCheckArgs {
  hospitalId: string;
  userId: string;
  message: ChatMessage;
  onAutoResponse?: AutoResponseHandler;
}

const debouncedCheckBusinessHours = debounce(
  async ({ hospitalId, userId, message, onAutoResponse }: DebouncedCheckArgs) => {
    try {
      const result = await checkBusinessHours(hospitalId, userId, message);
      if (result.autoResponseMessage && onAutoResponse) {
        await onAutoResponse({
          message: result.autoResponseMessage,
          detectedLanguage: result.detectedLanguage,
        });
      }
    } catch (error) {
      console.error('❌ Error in debounced check business hours:', error);
    }
  },
  5000, // 5초
  { trailing: true, leading: false },
);

/**
 * 메시지 전송 (Broadcast + Database 저장)
 */
export async function sendChatMessage(
  channel: any, // RealtimeChannel
  hospitalId: string,
  message: ChatMessage,
  onAutoResponse?: AutoResponseHandler,
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('📤 Sending message:', message);

    // 1. 실시간 Broadcast 전송
    const { error: broadcastError } = await channel.send({
      type: 'broadcast',
      event: 'message',
      payload: message,
    });

    if (broadcastError) {
      console.error('❌ Failed to broadcast message:', broadcastError);
      return { success: false, error: 'Broadcast failed' };
    }

    console.log('✅ Message broadcasted successfully');

    // 2. 데이터베이스에 저장
    const saveResult = await saveMessageToDatabase(
      hospitalId,
      message.content,
      message.type === 'user' ? 'USER' : 'ADMIN',
    );

    if (!saveResult.success) {
      console.error('❌ Failed to save message to database:', saveResult.error);
      return { success: false, error: saveResult.error };
    }

    console.log('✅ Message processing completed');

    // 3. 비즈니스 시간 체크 (디바운스)
    debouncedCheckBusinessHours({
      hospitalId,
      userId: message.userId,
      message,
      onAutoResponse,
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send/save message:', error);
    return { success: false, error: errorMessage };
  }
}

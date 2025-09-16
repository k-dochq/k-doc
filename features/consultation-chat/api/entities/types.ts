/**
 * 채팅 관련 타입 정의
 * UI와 독립적인 순수한 타입들
 */

export type ChatMessageType = 'user' | 'admin';

export interface ChatMessage {
  id: string;
  content: string;
  userId: string;
  userName: string;
  timestamp: string;
  type: ChatMessageType;
}

export interface TypingEvent {
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface BroadcastMessage {
  type: 'broadcast';
  event: 'message' | 'typing';
  payload: ChatMessage | TypingEvent;
}

// 채팅방 상태
export interface ChatRoomState {
  isConnected: boolean;
  isLoadingHistory: boolean;
  error: string | null;
  typingUsers: string[];
}

// 채팅 액션
export interface ChatActions {
  sendMessage: (content: string) => Promise<void>;
  sendTyping: (isTyping: boolean) => Promise<void>;
  refreshHistory: () => Promise<void>;
  clearError: () => void;
}

// 채팅 메타데이터
export interface ChatMetadata {
  roomId: string;
  channelName: string;
  hospitalId: string;
  userId: string;
  userName: string;
}

// 통합 채팅 훅 반환 타입
export interface UseRealtimeChatReturn extends ChatRoomState, ChatActions, ChatMetadata {
  messages: ChatMessage[];
}

// 메시지 검증 결과
export interface MessageValidationResult {
  isValid: boolean;
  error?: string;
}

// API 응답 타입
export interface ChatApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// 채팅 히스토리 API 응답
export interface ChatHistoryResponse {
  messages: Array<{
    id: string;
    content: string;
    userId: string;
    senderType: 'USER' | 'ADMIN';
    createdAt: string;
    User?: {
      name?: string;
      email?: string;
      user_metadata?: any;
    };
  }>;
}

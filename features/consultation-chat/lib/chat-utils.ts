/**
 * 채팅 관련 유틸리티 함수들
 * UI와 독립적인 순수한 로직 함수들
 */

import { type ChatMessage } from '../api/entities/types';

/**
 * 채팅방 ID 생성 (hospitalId-userId 형태)
 */
export function createRoomId(hospitalId: string, userId: string): string {
  return `${hospitalId}-${userId}`;
}

/**
 * 채팅방 ID에서 병원 ID 추출
 */
export function extractHospitalIdFromRoomId(roomId: string): string {
  return roomId.split('-')[0];
}

/**
 * 채팅방 ID에서 사용자 ID 추출
 */
export function extractUserIdFromRoomId(roomId: string): string {
  const parts = roomId.split('-');
  return parts.slice(1).join('-'); // userId에 '-'가 포함될 수 있으므로
}

/**
 * 메시지 시간 포맷팅
 */
export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

/**
 * 메시지 정렬 (시간순)
 */
export function sortMessagesByTime(messages: ChatMessage[]): ChatMessage[] {
  return [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

/**
 * 중복 메시지 제거
 */
export function deduplicateMessages(messages: ChatMessage[]): ChatMessage[] {
  const seen = new Set<string>();
  return messages.filter((message) => {
    if (seen.has(message.id)) {
      return false;
    }
    seen.add(message.id);
    return true;
  });
}

/**
 * 메시지 검증
 */
export function validateMessage(content: string): { isValid: boolean; error?: string } {
  if (!content || !content.trim()) {
    return { isValid: false, error: '메시지 내용이 비어있습니다.' };
  }

  if (content.trim().length > 1000) {
    return { isValid: false, error: '메시지는 1000자를 초과할 수 없습니다.' };
  }

  return { isValid: true };
}

/**
 * 채팅방 이름 생성
 */
export function createChannelName(roomId: string): string {
  return `chat-${roomId}`;
}

/**
 * 사용자 표시 이름 생성
 */
export function createDisplayName(userName?: string, email?: string): string {
  return userName || email || '사용자';
}

/**
 * 타이핑 상태 관리
 */
export class TypingManager {
  private typingUsers = new Set<string>();
  private timeouts = new Map<string, NodeJS.Timeout>();

  addTypingUser(userName: string): void {
    this.typingUsers.add(userName);

    // 기존 타임아웃 제거
    const existingTimeout = this.timeouts.get(userName);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // 3초 후 자동 제거
    const timeout = setTimeout(() => {
      this.removeTypingUser(userName);
    }, 3000);

    this.timeouts.set(userName, timeout);
  }

  removeTypingUser(userName: string): void {
    this.typingUsers.delete(userName);

    const timeout = this.timeouts.get(userName);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(userName);
    }
  }

  getTypingUsers(): string[] {
    return Array.from(this.typingUsers);
  }

  clear(): void {
    this.typingUsers.clear();
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts.clear();
  }
}

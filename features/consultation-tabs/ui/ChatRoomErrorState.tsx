'use client';

import { ErrorState } from 'shared/ui/error-state/ErrorState';

interface ChatRoomErrorStateProps {
  onRetry?: () => void;
  className?: string;
}

export function ChatRoomErrorState({ onRetry, className = '' }: ChatRoomErrorStateProps) {
  return (
    <div className={`p-4 ${className}`}>
      <ErrorState
        title='채팅방을 불러오는 중 오류가 발생했습니다'
        message='잠시 후 다시 시도해주세요'
        onRetry={onRetry}
        retryButtonText='다시 시도'
      />
    </div>
  );
}

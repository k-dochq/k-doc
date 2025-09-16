'use client';

import { type ChatMessage } from '../api/entities/types';
import { MessageListLoading } from './MessageListLoading';
import { MessageListEmpty } from './MessageListEmpty';
import { MessageListContent } from './MessageListContent';

interface MessageListProps {
  messages: ChatMessage[];
  hospitalName: string;
  hospitalImageUrl?: string;
  isLoading?: boolean;
}

export function MessageList({
  messages,
  hospitalName,
  hospitalImageUrl,
  isLoading,
}: MessageListProps) {
  // 로딩 상태
  if (isLoading) {
    return <MessageListLoading />;
  }

  // 빈 메시지 상태
  if (messages.length === 0) {
    return <MessageListEmpty />;
  }

  // 메시지 리스트 표시
  return (
    <MessageListContent
      messages={messages}
      hospitalName={hospitalName}
      hospitalImageUrl={hospitalImageUrl}
    />
  );
}

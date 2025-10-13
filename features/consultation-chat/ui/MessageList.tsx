'use client';

import { type ChatMessage } from '../api/entities/types';
import { MessageListLoading } from './MessageListLoading';
import { MessageListEmpty } from './MessageListEmpty';
import { MessageListContent } from './MessageListContent';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface MessageListProps {
  messages: ChatMessage[];
  hospitalName: string;
  hospitalImageUrl?: string;
  isLoading?: boolean;
  lang: Locale;
  dict: Dictionary;
  /**
   * 스크롤 기반 그라데이션 효과 활성화
   */
  enableScrollGradient?: boolean;
}

export function MessageList({
  messages,
  hospitalName,
  hospitalImageUrl,
  isLoading,
  lang,
  dict,
  enableScrollGradient = false,
}: MessageListProps) {
  // 로딩 상태
  if (isLoading) {
    return <MessageListLoading lang={lang} dict={dict} />;
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
      lang={lang}
      enableScrollGradient={enableScrollGradient}
    />
  );
}

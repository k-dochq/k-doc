'use client';

import { useEffect, useRef } from 'react';
import { type ChatMessage } from '../api/entities/types';
import { HospitalMessage } from './HospitalMessage';
import { UserMessage } from './UserMessage';
import { MessageDateSeparator } from './MessageDateSeparator';
import { formatMessageDate, isSameDay } from '../lib/chat-utils';
import { type Locale } from 'shared/config';
import './ScrollGradientStyles.css';

interface MessageListContentProps {
  messages: ChatMessage[];
  hospitalName: string;
  hospitalImageUrl?: string;
  lang: Locale;
  /**
   * 스크롤 기반 그라데이션 효과 활성화
   */
  enableScrollGradient?: boolean;
}

export function MessageListContent({
  messages,
  hospitalName,
  hospitalImageUrl,
  lang,
  enableScrollGradient = false,
}: MessageListContentProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 연속된 같은 발신자의 메시지인지 확인
  const shouldShowHeader = (currentIndex: number): boolean => {
    if (currentIndex === 0) return true;
    const currentMessage = messages[currentIndex];
    const previousMessage = messages[currentIndex - 1];

    return currentMessage.type !== previousMessage.type || currentMessage.type === 'admin'; // 병원 메시지는 항상 헤더 표시
  };

  // 날짜 구분자를 표시해야 하는지 확인
  const shouldShowDateSeparator = (currentIndex: number): boolean => {
    if (currentIndex === 0) return true; // 첫 번째 메시지는 항상 날짜 표시
    const currentMessage = messages[currentIndex];
    const previousMessage = messages[currentIndex - 1];

    return !isSameDay(previousMessage.timestamp, currentMessage.timestamp);
  };

  return (
    <div ref={scrollContainerRef} className='flex-1 overflow-y-auto optimized-scroll message-list-container'>
      <div className='flex flex-col content-stretch items-start justify-start gap-2 p-5'>
        {messages.map((message, index) => {
          const showDateSeparator = shouldShowDateSeparator(index);

          return (
            <div key={message.id} className='w-full'>
              {/* 날짜 구분자 */}
              {showDateSeparator && (
                <MessageDateSeparator date={formatMessageDate(message.timestamp, lang)} />
              )}

              {/* 메시지 */}
              {message.type === 'admin' ? (
                <HospitalMessage
                  message={message}
                  hospitalName={hospitalName}
                  hospitalImageUrl={hospitalImageUrl}
                  showHeader={shouldShowHeader(index)}
                />
              ) : (
                <UserMessage 
                  message={message} 
                  enableScrollGradient={enableScrollGradient}
                  scrollContainer={scrollContainerRef.current}
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

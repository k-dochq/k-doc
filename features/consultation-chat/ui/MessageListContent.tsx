'use client';

import { useEffect, useRef } from 'react';
import { type ChatMessage } from '../api/entities/types';
import { HospitalMessage } from './HospitalMessage';
import { UserMessage } from './UserMessage';
import { MessageDateSeparator } from './MessageDateSeparator';
import { formatMessageDate, isSameDay } from '../lib/chat-utils';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LoadOlderButton } from './LoadOlderButton';

interface MessageListContentProps {
  messages: ChatMessage[];
  hospitalName: string;
  hospitalImageUrl?: string;
  lang: Locale;
  hasMore?: boolean;
  onLoadMore?: () => Promise<void> | void;
  dict?: Dictionary;
}

export function MessageListContent({
  messages,
  hospitalName,
  hospitalImageUrl,
  lang,
  hasMore,
  onLoadMore,
  dict,
}: MessageListContentProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPrependingRef = useRef(false);
  const initialScrolledRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    if (isPrependingRef.current) return;
    if (!initialScrolledRef.current) {
      scrollToBottom();
      initialScrolledRef.current = true;
    }
  }, [messages]);

  const handleLoadMoreClick = async () => {
    if (!onLoadMore || !containerRef.current) {
      return;
    }
    const el = containerRef.current;
    const prevScrollHeight = el.scrollHeight;
    const prevScrollTop = el.scrollTop;
    isPrependingRef.current = true;
    await onLoadMore();
    // 메시지 추가 후 높이 차이만큼 보정하여 같은 위치 유지
    const newScrollHeight = el.scrollHeight;
    el.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
    isPrependingRef.current = false;
  };

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
    <div ref={containerRef} className='flex-1 overflow-y-auto'>
      <LoadOlderButton hasMore={hasMore} onClick={handleLoadMoreClick} dict={dict} />
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
                <UserMessage message={message} />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

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
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function MessageList({
  messages,
  hospitalName,
  hospitalImageUrl,
  isLoading,
  lang,
  dict,
  hasMore,
  onLoadMore,
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
    <div className='flex-1 overflow-y-auto'>
      {hasMore && (
        <div className='flex w-full justify-center p-2'>
          <button
            type='button'
            className='text-sm text-gray-500 underline-offset-4'
            onClick={onLoadMore}
          >
            {dict.comments?.list?.loadMore || 'Load previous messages'}
          </button>
        </div>
      )}
      <MessageListContent
        messages={messages}
        hospitalName={hospitalName}
        hospitalImageUrl={hospitalImageUrl}
        lang={lang}
      />
    </div>
  );
}

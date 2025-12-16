'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { type ChatMessage } from '../api/entities/types';

interface ConsultationChatMainV2Props {
  lang: Locale;
  dict: Dictionary;
  hospitalName: string;
  hospitalImageUrl?: string;
  messages: ChatMessage[];
  isLoadingHistory: boolean;
  isConnected: boolean;
  onSendMessage: (content: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function ConsultationChatMainV2({
  lang,
  dict,
  hospitalName,
  hospitalImageUrl,
  messages,
  isLoadingHistory,
  isConnected,
  onSendMessage,
  hasMore,
  onLoadMore,
}: ConsultationChatMainV2Props) {
  return (
    <div className='flex h-screen flex-col bg-white'>
      <PageHeaderV2 title={hospitalName} fallbackUrl={`/${lang}/consultation`} />

      <div className='h-[58px]' />

      <MessageList
        messages={messages}
        hospitalName={hospitalName}
        hospitalImageUrl={hospitalImageUrl}
        isLoading={isLoadingHistory}
        lang={lang}
        dict={dict}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      />

      <ChatInput
        onSendMessage={onSendMessage}
        placeholder={dict.consultation?.input?.placeholder || '무엇이든 물어보세요!'}
        disabled={!isConnected}
        dict={dict}
      />
    </div>
  );
}

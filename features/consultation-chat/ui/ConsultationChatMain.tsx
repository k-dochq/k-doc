'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeader } from 'shared/ui/page-header';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { type ChatMessage } from '../api/entities/types';

interface ConsultationChatMainProps {
  lang: Locale;
  dict: Dictionary;
  hospitalName: string;
  hospitalImageUrl?: string;
  messages: ChatMessage[];
  isLoadingHistory: boolean;
  isConnected: boolean;
  onSendMessage: (content: string) => void;
}

export function ConsultationChatMain({
  lang,
  dict,
  hospitalName,
  hospitalImageUrl,
  messages,
  isLoadingHistory,
  isConnected,
  onSendMessage,
}: ConsultationChatMainProps) {
  return (
    <div className='flex h-screen flex-col'>
      <PageHeader
        lang={lang}
        title={hospitalName}
        fallbackUrl={`/${lang}/consultation`}
        variant='light'
      />

      <MessageList
        messages={messages}
        hospitalName={hospitalName}
        hospitalImageUrl={hospitalImageUrl}
        isLoading={isLoadingHistory}
        lang={lang}
        dict={dict}
        enableScrollGradient={true}
      />

      <ChatInput
        onSendMessage={onSendMessage}
        placeholder={dict.consultation?.input?.placeholder || '무엇이든 물어보세요!'}
        disabled={!isConnected}
      />
    </div>
  );
}

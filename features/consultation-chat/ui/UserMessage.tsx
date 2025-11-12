'use client';

import React from 'react';
import { MessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { parseCombinedMessage } from 'shared/lib/message-parser';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';

interface UserMessageProps {
  message: ChatMessage;
  lang: Locale;
  dict: Dictionary;
}

export function UserMessage({ message, lang, dict }: UserMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);

  return (
    <div className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'>
      <MessageTime time={formattedTime} />
      <div className='relative flex shrink-0 content-stretch items-end justify-end'>
        <div className='flex flex-row items-end self-stretch'>
          <MessageBubble variant='user' className='h-full items-end justify-start'>
            <div
              className="relative min-w-0 font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-50 not-italic"
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
            >
              {parseCombinedMessage({
                message: message.content,
                lang,
                dict,
              }).map((item, index) => {
                if (typeof item === 'string') {
                  return <span key={`text-${index}`}>{item}</span>;
                }
                // React 요소는 이미 key가 있으므로 그대로 반환
                return item;
              })}
            </div>
          </MessageBubble>
        </div>
      </div>
    </div>
  );
}

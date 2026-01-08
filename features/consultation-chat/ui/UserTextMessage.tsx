'use client';

import React from 'react';
import { UserMessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { parseCombinedMessage } from 'shared/lib/message-parser';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface UserTextMessageProps {
  content: string;
  formattedTime: string;
  lang: Locale;
  dict: Dictionary;
}

export function UserTextMessage({ content, formattedTime, lang, dict }: UserTextMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'>
      <MessageTime time={formattedTime} />
      <div className='relative flex shrink-0 content-stretch items-end justify-end'>
        <div className='flex flex-row items-end self-stretch'>
          <UserMessageBubble className='h-full items-end justify-start'>
            <div
              className="relative min-w-0 font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-50 not-italic"
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
            >
              {parseCombinedMessage({
                message: content,
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
          </UserMessageBubble>
        </div>
      </div>
    </div>
  );
}

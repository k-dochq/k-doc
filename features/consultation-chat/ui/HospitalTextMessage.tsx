'use client';

import React from 'react';
import { HospitalMessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { HospitalHeader } from 'entities/hospital/ui/HospitalHeader';
import { parseCombinedMessage } from 'shared/lib/message-parser';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HospitalTextMessageProps {
  content: string;
  formattedTime: string;
  hospitalName: string;
  hospitalImageUrl?: string;
  showHeader?: boolean;
  lang: Locale;
  dict: Dictionary;
  returnUrl?: string;
}

export function HospitalTextMessage({
  content,
  formattedTime,
  hospitalName,
  hospitalImageUrl,
  showHeader = true,
  lang,
  dict,
  returnUrl,
}: HospitalTextMessageProps) {
  return (
    <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-1'>
      {showHeader && <HospitalHeader hospitalName={hospitalName} imageUrl={hospitalImageUrl} />}
      <div className='relative box-border flex w-full shrink-0 content-stretch items-end justify-start gap-2 py-0 pr-0 pl-[38px]'>
        <div className='relative flex min-w-0 shrink-0 content-stretch items-start justify-start'>
          <HospitalMessageBubble className='self-stretch'>
            <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-900 not-italic">
              {parseCombinedMessage({
                message: content,
                lang,
                dict,
                returnUrl,
              }).map((item, index) => {
                if (typeof item === 'string') {
                  return <span key={`text-${index}`}>{item}</span>;
                }
                // React 요소는 이미 key가 있으므로 그대로 반환
                return item;
              })}
            </div>
          </HospitalMessageBubble>
        </div>
        <MessageTime time={formattedTime} />
      </div>
    </div>
  );
}

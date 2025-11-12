'use client';

import React from 'react';
import { MessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { HospitalHeader } from 'entities/hospital/ui/HospitalHeader';
import { parseCombinedMessage } from 'shared/lib/message-parser';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';
import { analyzeMessageContent } from '../lib/message-content-handler';
import { PictureMessage } from './PictureMessage';

interface HospitalMessageProps {
  message: ChatMessage;
  hospitalName: string;
  hospitalImageUrl?: string;
  showHeader?: boolean;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalMessage({
  message,
  hospitalName,
  hospitalImageUrl,
  showHeader = true,
  lang,
  dict,
}: HospitalMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);

  // returnUrl을 현재 URL의 경로로 설정 (pathname만)
  const returnUrl = typeof window !== 'undefined' ? window.location.pathname : undefined;

  const contentAnalysis = analyzeMessageContent(message.content);

  // Picture만 있는 경우: 버블 없이 이미지만 표시
  if (contentAnalysis.hasOnlyPictures) {
    return (
      <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-1'>
        {showHeader && <HospitalHeader hospitalName={hospitalName} imageUrl={hospitalImageUrl} />}
        <div className='relative box-border flex w-full shrink-0 content-stretch items-end justify-start gap-2 py-0 pr-0 pl-[38px]'>
          <div className='relative flex min-w-0 shrink-0 content-stretch items-start justify-start'>
            <PictureMessage pictures={contentAnalysis.pictures} dict={dict} align='start' />
          </div>
          <MessageTime time={formattedTime} />
        </div>
      </div>
    );
  }

  // 텍스트만 있는 경우: 기존처럼 버블로 표시
  return (
    <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-1'>
      {showHeader && <HospitalHeader hospitalName={hospitalName} imageUrl={hospitalImageUrl} />}
      <div className='relative box-border flex w-full shrink-0 content-stretch items-end justify-start gap-2 py-0 pr-0 pl-[38px]'>
        <div className='relative flex min-w-0 shrink-0 content-stretch items-start justify-start'>
          <MessageBubble variant='hospital' className='self-stretch'>
            <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-900 not-italic">
              {parseCombinedMessage({
                message: message.content,
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
          </MessageBubble>
        </div>
        <MessageTime time={formattedTime} />
      </div>
    </div>
  );
}

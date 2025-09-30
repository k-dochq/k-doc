'use client';

import { MessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { HospitalHeader } from 'entities/hospital/ui/HospitalHeader';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';

interface HospitalMessageProps {
  message: ChatMessage;
  hospitalName: string;
  hospitalImageUrl?: string;
  showHeader?: boolean;
}

export function HospitalMessage({
  message,
  hospitalName,
  hospitalImageUrl,
  showHeader = true,
}: HospitalMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);

  return (
    <div className='relative flex w-full shrink-0 flex-col content-stretch items-start justify-start gap-1'>
      {showHeader && <HospitalHeader hospitalName={hospitalName} imageUrl={hospitalImageUrl} />}
      <div className='relative box-border flex w-full shrink-0 content-stretch items-end justify-start gap-2 py-0 pr-0 pl-[38px]'>
        <div className='relative flex shrink-0 content-stretch items-start justify-start'>
          <MessageBubble variant='hospital' className='self-stretch'>
            <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-900 not-italic">
              {message.content}
            </div>
          </MessageBubble>
        </div>
        <MessageTime time={formattedTime} />
      </div>
    </div>
  );
}

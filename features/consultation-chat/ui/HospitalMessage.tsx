'use client';

import { MessageBubble, MessageTail, MessageTime } from 'shared/ui/message-bubble';
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
          <div className='relative flex flex-row items-start self-stretch'>
            <MessageBubble variant='hospital' className='self-stretch'>
              <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-900 not-italic">
                {message.content}
              </div>
            </MessageBubble>
          </div>
          {/* 꼬리 - 왼쪽 상단에 위치 */}
          <div 
            className='absolute -left-[1px] top-0 w-[17px] h-5 overflow-visible'
            style={{ color: '#F5F5F5' }}
          >
            <div className='absolute left-[-5%] right-[-75%] top-0'>
              <MessageTail variant='hospital' />
            </div>
          </div>
        </div>
        <MessageTime time={formattedTime} />
      </div>
    </div>
  );
}

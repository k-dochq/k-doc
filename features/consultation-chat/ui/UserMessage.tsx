'use client';

import { MessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { parseTextWithLinks } from 'shared/lib';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
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
              {parseTextWithLinks(message.content)}
            </div>
          </MessageBubble>
        </div>
      </div>
    </div>
  );
}

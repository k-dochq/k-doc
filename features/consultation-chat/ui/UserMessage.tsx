'use client';

import { MessageBubble, MessageTime } from 'shared/ui/message-bubble';
import { type ChatMessage } from '../api/entities/types';
import { formatMessageTime } from '../lib/chat-utils';
import { useViewportGradient, VIEWPORT_GRADIENT_COLORS } from '../hooks/useViewportGradient';

interface UserMessageProps {
  message: ChatMessage;
  /**
   * 스크롤 기반 그라데이션 효과 활성화
   */
  enableScrollGradient?: boolean;
  /**
   * 스크롤 컨테이너 (뷰포트 계산용)
   */
  scrollContainer?: HTMLElement | null;
}

export function UserMessage({ 
  message, 
  enableScrollGradient = false,
  scrollContainer
}: UserMessageProps) {
  const formattedTime = formatMessageTime(message.timestamp);

  // 뷰포트 기반 그라데이션
  const { gradient, ref } = useViewportGradient({
    colors: VIEWPORT_GRADIENT_COLORS.purple,
    scrollContainer,
  });

  return (
    <div 
      ref={enableScrollGradient ? ref : null}
      className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'
    >
      <MessageTime time={formattedTime} />
      <div className='relative flex shrink-0 content-stretch items-end justify-end'>
        <div className='flex flex-row items-end self-stretch'>
          <MessageBubble 
            variant='user' 
            className='h-full items-end justify-start'
            enableScrollGradient={enableScrollGradient}
            customGradient={enableScrollGradient ? gradient : undefined}
          >
            <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-50 not-italic">
              {message.content}
            </div>
          </MessageBubble>
        </div>
      </div>
    </div>
  );
}

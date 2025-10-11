'use client';

import { MessageBubble, MessageTail, MessageTime } from 'shared/ui/message-bubble';
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
    colors: VIEWPORT_GRADIENT_COLORS.purple.map(color => [...color] as number[]),
    scrollContainer,
  });

  const bubbleBackground = enableScrollGradient && gradient 
    ? gradient 
    : 'linear-gradient(180deg, #ae33fb 37.132%, #da47ef 162.93%, #6544fa 291.18%)';

  return (
    <div 
      ref={enableScrollGradient ? (ref as React.RefObject<HTMLDivElement>) : null}
      className='relative flex w-full shrink-0 content-stretch items-end justify-end gap-2'
    >
      <MessageTime time={formattedTime} />
      <div 
        className='relative flex shrink-0 content-stretch items-end justify-end [transition:--bubble-bg_0.4s_ease-out]'
        style={{
          ['--bubble-bg' as string]: bubbleBackground,
        } as React.CSSProperties}
      >
        <div className='relative flex flex-row items-end self-stretch'>
          <div 
            className='box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] shrink-0 max-w-[280px] break-words h-full items-end justify-start'
            style={{
              background: bubbleBackground,
            }}
          >
            <div className="relative font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[20px] break-words whitespace-pre-wrap text-neutral-50 not-italic">
              {message.content}
            </div>
          </div>
        </div>
        <div style={{ color: bubbleBackground }}>
          <MessageTail 
            variant='user' 
            enableScrollGradient={false}
            customGradient={bubbleBackground}
          />
        </div>
      </div>
    </div>
  );
}

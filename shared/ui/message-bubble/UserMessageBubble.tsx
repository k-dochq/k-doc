'use client';

import { type ReactNode } from 'react';

interface UserMessageBubbleProps {
  children: ReactNode;
  className?: string;
  isRtl?: boolean;
  variant?: 'default' | 'link';
}

export function UserMessageBubble({ children, className = '', isRtl = false, variant = 'default' }: UserMessageBubbleProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] max-w-[260px] break-words overflow-visible min-w-0';

  const isLink = variant === 'link';

  const bubbleStyle = isLink
    ? { background: '#FAFAFA' }
    : { background: 'linear-gradient(180deg, #8B45F6 0%, #6544FA 100%)' };

  const tailColor = isLink ? '#FAFAFA' : '#6544FA';

  return (
    <div className={`${baseClasses} ${className}`} style={bubbleStyle}>
      {children}
      {/* 말풍선 꼬리 SVG */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='19'
        viewBox='0 0 12 19'
        fill='none'
        className={`pointer-events-none absolute bottom-0 z-0 ${isRtl ? 'left-[-5px] scale-x-[-1]' : 'right-[-5px]'}`}
      >
        <path
          d='M11.8886 18.8631C6.73688 19.6573 1.6512 16.8201 0 15L7 0V6C7 17.5 12.8793 18.2642 11.8886 18.8631Z'
          fill={tailColor}
        />
      </svg>
    </div>
  );
}

'use client';

import { type ReactNode } from 'react';

interface HospitalMessageBubbleProps {
  children: ReactNode;
  className?: string;
  isRtl?: boolean;
  variant?: 'default' | 'link';
}

export function HospitalMessageBubble({ children, className = '', isRtl = false, variant = 'default' }: HospitalMessageBubbleProps) {
  const isLink = variant === 'link';

  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] max-w-[260px] break-words overflow-visible min-w-0';

  const bubbleStyle = isLink ? { background: '#155DFC' } : { background: '#F5F5F5' };
  const tailColor = isLink ? '#155DFC' : '#F5F5F5';

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
        className={`pointer-events-none absolute top-0 z-0 ${isRtl ? 'right-[-5px] scale-x-[-1]' : 'left-[-5px]'}`}
      >
        <path
          d='M0.111382 0.137075C5.26312 -0.657162 10.3488 2.18006 12 4.00018L5 19.0002V13.0002C5 1.50018 -0.879335 0.736019 0.111382 0.137075Z'
          fill={tailColor}
        />
      </svg>
    </div>
  );
}

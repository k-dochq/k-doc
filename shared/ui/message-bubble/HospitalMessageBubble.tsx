'use client';

import { type ReactNode } from 'react';

interface HospitalMessageBubbleProps {
  children: ReactNode;
  className?: string;
}

export function HospitalMessageBubble({ children, className = '' }: HospitalMessageBubbleProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] shrink-0 max-w-[260px] break-words overflow-visible min-w-0 bg-neutral-100';

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
      {/* 말풍선 꼬리 SVG - 왼쪽 맨 위 */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='19'
        viewBox='0 0 12 19'
        fill='none'
        className='pointer-events-none absolute top-[-2px] left-[-5px] z-0'
      >
        <path
          d='M0.111382 0.137075C5.26312 -0.657162 10.3488 2.18006 12 4.00018L5 19.0002V13.0002C5 1.50018 -0.879335 0.736019 0.111382 0.137075Z'
          fill='#F5F5F5'
        />
      </svg>
    </div>
  );
}

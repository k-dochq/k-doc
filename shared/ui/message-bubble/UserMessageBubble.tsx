'use client';

import { type ReactNode } from 'react';

interface UserMessageBubbleProps {
  children: ReactNode;
  className?: string;
}

export function UserMessageBubble({ children, className = '' }: UserMessageBubbleProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] shrink-0 max-w-[260px] break-words overflow-visible min-w-0';

  const userGradientStyle = {
    background: 'linear-gradient(180deg, #AE33FB -251.39%, #DA47EF 226.61%, #6544FA 713.89%)',
  };

  return (
    <div className={`${baseClasses} ${className}`} style={userGradientStyle}>
      {children}
      {/* 말풍선 꼬리 SVG */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='19'
        viewBox='0 0 12 19'
        fill='none'
        className='pointer-events-none absolute right-[-5px] bottom-0 z-0'
        // style={{ transform: 'translate(50%, 50%)' }}
      >
        <path
          d='M11.8886 18.8631C6.73688 19.6573 1.6512 16.8201 0 15L7 0V6C7 17.5 12.8793 18.2642 11.8886 18.8631Z'
          fill='#CD42F3'
        />
      </svg>
    </div>
  );
}

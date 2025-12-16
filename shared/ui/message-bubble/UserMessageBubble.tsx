'use client';

import { type ReactNode } from 'react';

interface UserMessageBubbleProps {
  children: ReactNode;
  className?: string;
}

export function UserMessageBubble({ children, className = '' }: UserMessageBubbleProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] shrink-0 max-w-[260px] break-words overflow-hidden min-w-0';

  const userGradientStyle = {
    background: 'linear-gradient(180deg, #AE33FB -251.39%, #DA47EF 226.61%, #6544FA 713.89%)',
  };

  return (
    <div className={`${baseClasses} ${className}`} style={userGradientStyle}>
      {children}
    </div>
  );
}

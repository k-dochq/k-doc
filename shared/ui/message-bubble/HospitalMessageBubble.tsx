'use client';

import { type ReactNode } from 'react';

interface HospitalMessageBubbleProps {
  children: ReactNode;
  className?: string;
}

export function HospitalMessageBubble({ children, className = '' }: HospitalMessageBubbleProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] shrink-0 max-w-[260px] break-words overflow-hidden min-w-0 bg-neutral-100';

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
}

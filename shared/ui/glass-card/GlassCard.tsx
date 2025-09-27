import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`flex flex-col items-start gap-4 rounded-xl border border-white p-5 backdrop-blur-[6px] ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.50)',
        boxShadow: '1px 1px 12px 0 rgba(76, 25, 168, 0.12)',
      }}
    >
      {children}
    </div>
  );
}

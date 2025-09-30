'use client';

import { type ReactNode } from 'react';
import '../../../features/consultation-chat/ui/ScrollGradientStyles.css';

interface MessageBubbleProps {
  children: ReactNode;
  variant: 'user' | 'hospital';
  className?: string;
  /**
   * 스크롤 기반 그라데이션 효과 활성화 (user variant에서만 적용)
   */
  enableScrollGradient?: boolean;
  /**
   * 커스텀 그라데이션 (enableScrollGradient가 true일 때 우선 적용)
   */
  customGradient?: string;
}

export function MessageBubble({ 
  children, 
  variant, 
  className = '', 
  enableScrollGradient = false,
  customGradient
}: MessageBubbleProps) {
  const baseClasses =
    'box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-2 relative rounded-[12px] shrink-0 max-w-[280px] break-words';

  const variantClasses = {
    user: enableScrollGradient 
      ? 'viewport-message-bubble-gradient' 
      : 'bg-gradient-to-b from-[#ae33fb] from-[37.132%] to-[#6544fa] to-[291.18%] via-[#da47ef] via-[162.93%]',
    hospital: 'bg-neutral-100',
  };

  // GPU 가속을 위한 will-change 속성 추가
  const gpuAccelerationStyle = enableScrollGradient && variant === 'user' 
    ? { willChange: 'background' as const }
    : {};

  // 커스텀 그라데이션이 있으면 인라인 스타일로 적용
  const customStyle = customGradient && enableScrollGradient && variant === 'user'
    ? { background: customGradient }
    : {};

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ ...gpuAccelerationStyle, ...customStyle }}
    >
      {children}
    </div>
  );
}

'use client';

import { ShareIcon } from 'shared/ui/icons';

interface ShareButtonProps {
  onClick?: () => void;
}

export function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
      className='flex items-center justify-center'
      aria-label='공유하기'
    >
      <ShareIcon />
    </button>
  );
}

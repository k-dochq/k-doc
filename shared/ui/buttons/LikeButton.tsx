'use client';

import { HeartIcon } from '../icons/HeartIcon';
import { HeartOutlineIcon } from '../icons/HeartOutlineIcon';

interface LikeButtonProps {
  count: number;
  isLiked?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LikeButton({ count, isLiked = false, onClick, className = '' }: LikeButtonProps) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1 ${className}`} type='button'>
      {isLiked ? <HeartIcon /> : <HeartOutlineIcon />}
      <span className='text-sm font-medium text-neutral-900'>{count}</span>
    </button>
  );
}

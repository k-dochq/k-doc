'use client';

import { HeartIcon } from '../icons/HeartIcon';
import { HeartOutlineIcon } from '../icons/HeartOutlineIcon';

interface LikeButtonProps {
  count: number;
  isLiked?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  isLoading?: boolean;
}

export function LikeButton({
  count,
  isLiked = false,
  onClick,
  className = '',
  isLoading = false,
}: LikeButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`flex items-center gap-1 ${className} ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
      type='button'
      disabled={isLoading}
    >
      <div className={`${isLoading ? 'animate-pulse' : ''}`}>
        {isLiked ? <HeartIcon /> : <HeartOutlineIcon />}
      </div>
      <span className={`text-sm font-medium text-neutral-900 ${isLoading ? 'animate-pulse' : ''}`}>
        {count}
      </span>
    </button>
  );
}

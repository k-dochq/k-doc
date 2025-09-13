'use client';

import { HeartIcon } from '../icons/HeartIcon';
import { HeartOutlineIcon } from '../icons/HeartOutlineIcon';
import { LoadingIcon } from '../loading-icon';

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
        if (!isLoading) {
          onClick?.(e);
        }
      }}
      className={`flex items-center gap-1 ${className} ${isLoading ? 'cursor-not-allowed' : ''}`}
      type='button'
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingIcon size={16} className='text-neutral-500' />
      ) : (
        <div>{isLiked ? <HeartIcon /> : <HeartOutlineIcon />}</div>
      )}
      <span className={`text-sm font-medium text-neutral-900 ${isLoading ? 'opacity-70' : ''}`}>
        {count}
      </span>
    </button>
  );
}

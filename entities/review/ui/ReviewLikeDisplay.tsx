'use client';

import { HeartIcon } from 'shared/ui/icons/HeartIcon';
import { HeartOutlineIcon } from 'shared/ui/icons/HeartOutlineIcon';
import { LoadingIcon } from 'shared/ui/loading-icon';

interface ReviewLikeDisplayProps {
  count: number;
  isLiked?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  isLoading?: boolean;
}

export function ReviewLikeDisplay({
  count,
  isLiked = false,
  onClick,
  className = '',
  isLoading = false,
}: ReviewLikeDisplayProps) {
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
        <LoadingIcon size={16} className='text-neutral-400' />
      ) : (
        <div>{isLiked ? <HeartIcon /> : <HeartOutlineIcon />}</div>
      )}
      <span className={`text-sm font-medium text-neutral-400 ${isLoading ? 'opacity-70' : ''}`}>
        {count.toLocaleString()}
      </span>
    </button>
  );
}

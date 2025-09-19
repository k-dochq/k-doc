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
  vertical?: boolean; // 수직 배치 옵션
  showCount?: boolean; // 숫자 표시 여부 옵션
}

export function LikeButton({
  count,
  isLiked = false,
  onClick,
  className = '',
  isLoading = false,
  vertical = false,
  showCount = true,
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
      className={`flex ${vertical ? 'flex-col items-center gap-0.5' : 'items-center gap-1'} ${className} ${isLoading ? 'cursor-not-allowed' : ''}`}
      type='button'
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingIcon size={16} className='text-neutral-500' />
      ) : (
        <div>{isLiked ? <HeartIcon /> : <HeartOutlineIcon />}</div>
      )}
      {showCount && (
        <span className={`text-sm font-medium text-neutral-900 ${isLoading ? 'opacity-70' : ''}`}>
          {count}
        </span>
      )}
    </button>
  );
}

'use client';

import { LoadingIcon } from 'shared/ui/loading-icon';
import { HeartIcon, HeartOutlineIcon } from 'shared/ui/icons';

interface LikeButtonProps {
  likeCount?: number;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  isLoading?: boolean;
}

export function LikeButton({
  likeCount = 0,
  isLiked = false,
  onLikeToggle,
  isLoading = false,
}: LikeButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoading) {
          onLikeToggle?.();
        }
      }}
      className={`flex items-center gap-1 ${isLoading ? 'cursor-not-allowed' : ''}`}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingIcon size={20} className='text-neutral-900 opacity-70' />
      ) : isLiked ? (
        <HeartIcon />
      ) : (
        <HeartOutlineIcon />
      )}
      <span className={`text-base font-medium text-neutral-900 ${isLoading ? 'opacity-70' : ''}`}>
        {likeCount}
      </span>
    </button>
  );
}

'use client';

import { LoadingIcon } from 'shared/ui/loading-icon';
import { HeartIconV2Detail, HeartOutlineIconV2Detail } from 'shared/ui/icons';

interface LikeButtonV2Props {
  likeCount?: number;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  isLoading?: boolean;
}

export function LikeButtonV2({
  likeCount = 0,
  isLiked = false,
  onLikeToggle,
  isLoading = false,
}: LikeButtonV2Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoading) {
          onLikeToggle?.();
        }
      }}
      className={`flex items-center justify-center ${isLoading ? 'cursor-not-allowed' : ''}`}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingIcon size={20} className='text-neutral-900 opacity-70' />
      ) : isLiked ? (
        <HeartIconV2Detail />
      ) : (
        <HeartOutlineIconV2Detail />
      )}
    </button>
  );
}

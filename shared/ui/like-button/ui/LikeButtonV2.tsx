'use client';

import { LoadingIcon } from 'shared/ui/loading-icon';
import { HeartIconV2Detail, HeartOutlineIconV2Detail } from 'shared/ui/icons';

interface LikeButtonV2Props {
  likeCount?: number; // 호환성 유지용 (UI에 표시하지 않음)
  isLiked?: boolean;
  onLikeToggle?: () => void;
  isLoading?: boolean;
  className?: string;
}

export function LikeButtonV2({
  likeCount = 0, // 사용하지 않지만 시그니처 호환을 위해 유지
  isLiked = false,
  onLikeToggle,
  isLoading = false,
  className = '',
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
      className={`flex items-center justify-center ${isLoading ? 'cursor-not-allowed' : ''} ${className}`}
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

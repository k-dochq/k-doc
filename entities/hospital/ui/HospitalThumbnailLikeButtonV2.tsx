'use client';

import { LoadingIcon } from 'shared/ui/loading-icon';
import { HeartIconV2 } from 'shared/ui/icons/HeartIconV2';
import { HeartOutlineIconV2 } from 'shared/ui/icons/HeartOutlineIconV2';

interface HospitalThumbnailLikeButtonV2Props {
  isLiked: boolean;
  isLikeLoading?: boolean;
  onToggleLike?: () => void;
  className?: string;
}

export function HospitalThumbnailLikeButtonV2({
  isLiked,
  isLikeLoading = false,
  onToggleLike,
  className = '',
}: HospitalThumbnailLikeButtonV2Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLikeLoading) {
      onToggleLike?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute right-2 bottom-2 z-10 flex items-center justify-center ${className}`}
      type='button'
      disabled={isLikeLoading}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      {isLikeLoading ? (
        <LoadingIcon size={20} className='text-white' />
      ) : isLiked ? (
        <HeartIconV2 />
      ) : (
        <HeartOutlineIconV2 />
      )}
    </button>
  );
}

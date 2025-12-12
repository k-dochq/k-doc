'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';
import { HeartIconV2 } from 'shared/ui/icons/HeartIconV2';
import { HeartOutlineIconV2 } from 'shared/ui/icons/HeartOutlineIconV2';
import { LoadingIcon } from 'shared/ui/loading-icon';

interface HospitalCardV2ThumbnailProps {
  imageUrl: string | null;
  alt: string;
  showLikeButton?: boolean;
  isLiked?: boolean;
  onToggleLike?: () => void;
  isLikeLoading?: boolean;
}

export function HospitalCardV2Thumbnail({
  imageUrl,
  alt,
  showLikeButton = false,
  isLiked = false,
  onToggleLike,
  isLikeLoading = false,
}: HospitalCardV2ThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !imageUrl || imageError;
  const imageSrc = shouldShowDefaultImage
    ? DEFAULT_IMAGES.HOSPITAL_DEFAULT
    : imageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLikeLoading) {
      onToggleLike?.();
    }
  };

  return (
    <div className='relative h-[130px] w-full shrink-0 overflow-clip'>
      <div className='absolute top-[0px] left-0 h-[130px] w-full'>
        <div className='pointer-events-none relative h-full w-full overflow-hidden'>
          <Image
            alt={alt}
            src={imageSrc}
            fill
            sizes='150px'
            className='object-cover'
            onError={handleImageError}
          />
        </div>
      </div>

      {/* 좋아요 버튼 */}
      {showLikeButton && (
        <button
          onClick={handleLikeClick}
          className='absolute right-2 bottom-2 z-10 flex items-center justify-center'
          type='button'
          disabled={isLikeLoading}
        >
          {isLikeLoading ? (
            <LoadingIcon size={20} className='text-white' />
          ) : (
            <div>{isLiked ? <HeartIconV2 /> : <HeartOutlineIconV2 />}</div>
          )}
        </button>
      )}
    </div>
  );
}

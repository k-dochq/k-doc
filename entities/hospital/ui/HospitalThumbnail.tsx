'use client';

import { useState } from 'react';
import { HotLabel } from 'shared/ui/hot-label';

interface HospitalThumbnailProps {
  imageUrl: string | null;
  alt?: string;
}

export function HospitalThumbnail({
  imageUrl,
  alt = 'Hospital thumbnail',
}: HospitalThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !imageUrl || imageError;

  return (
    <div className='relative flex h-[132px] w-[132px] flex-shrink-0 items-stretch'>
      {/* 기본 썸네일 배경 (blur 효과) */}
      <img
        src='/images/shared/default_thumbnail.jpg'
        alt=''
        className='absolute inset-0 top-0 left-0 h-[132px] w-[132px] rounded-l-lg object-cover blur-lg'
      />

      {/* 실제 이미지 또는 디폴트 이미지 오버레이 */}
      {shouldShowDefaultImage ? (
        <img
          src='/images/shared/default_image_square.png'
          alt={alt}
          className='relative z-10 h-full w-full rounded-l-lg object-cover'
        />
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          className='relative z-10 h-full w-full rounded-l-lg object-cover'
          onError={handleImageError}
        />
      )}

      <div className='absolute top-[-5px] left-[-5px] z-20'>
        <HotLabel />
      </div>
    </div>
  );
}

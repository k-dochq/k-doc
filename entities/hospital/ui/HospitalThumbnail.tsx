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
      {/* 이미지 컨테이너 - overflow-hidden 적용 */}
      <div className='relative h-full w-full overflow-hidden rounded-l-lg'>
        {/* 기본 썸네일 배경 (blur 효과) - 이미지 로딩 전에만 표시 */}
        <img
          src='/images/shared/default_thumbnail.jpg'
          alt=''
          className='absolute inset-0 h-full w-full object-cover blur-lg'
        />

        {/* 실제 이미지 또는 디폴트 이미지 오버레이 */}
        {shouldShowDefaultImage ? (
          <img
            src='/images/shared/default_image_square.png'
            alt={alt}
            className='relative z-10 h-full w-full object-cover'
          />
        ) : (
          <img
            src={imageUrl}
            alt={alt}
            className='relative z-10 h-full w-full object-cover'
            onError={handleImageError}
          />
        )}
      </div>

      {/* HotLabel - overflow-hidden 컨테이너 밖에 위치 */}
      <div className='absolute top-[-5px] left-[-5px] z-20'>
        <HotLabel />
      </div>
    </div>
  );
}

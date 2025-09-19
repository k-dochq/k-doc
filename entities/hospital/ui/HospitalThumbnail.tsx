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
    <div className='relative flex h-full w-[120px] flex-shrink-0 items-stretch'>
      {shouldShowDefaultImage ? (
        <img
          src='/images/shared/default_image_square.png'
          alt={alt}
          className='h-full w-full rounded-l-lg object-fill'
          style={{
            height: '100%',
          }}
        />
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          className='h-full w-full rounded-l-lg object-fill'
          onError={handleImageError}
          style={{
            height: '100%',
          }}
        />
      )}
      <div className='absolute top-[-5px] left-[-5px]'>
        <HotLabel />
      </div>
    </div>
  );
}

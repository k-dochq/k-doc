'use client';

import { useState } from 'react';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalCardV2ThumbnailProps {
  imageUrl: string | null;
  alt: string;
}

export function HospitalCardV2Thumbnail({ imageUrl, alt }: HospitalCardV2ThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !imageUrl || imageError;
  const imageSrc = shouldShowDefaultImage
    ? DEFAULT_IMAGES.HOSPITAL_DEFAULT
    : imageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT;

  return (
    <div className='relative h-[130px] w-full shrink-0 overflow-clip'>
      <div className='absolute top-[-20px] left-0 size-[150px]'>
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <img
            alt={alt}
            className='absolute top-0 left-0 size-full max-w-none object-cover'
            src={imageSrc}
            onError={handleImageError}
          />
        </div>
      </div>
    </div>
  );
}

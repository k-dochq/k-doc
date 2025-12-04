'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      <div className='absolute top-[-20px] left-0 h-[150px] w-full'>
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
    </div>
  );
}

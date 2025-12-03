'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface LiveReviewCardV2ThumbnailProps {
  imageUrl: string | null;
  alt: string;
}

export function LiveReviewCardV2Thumbnail({ imageUrl, alt }: LiveReviewCardV2ThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !imageUrl || imageError;
  const imageSrc = shouldShowDefaultImage
    ? DEFAULT_IMAGES.HOSPITAL_DEFAULT
    : imageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT;

  return (
    <div className='relative h-[190px] w-full overflow-clip bg-[#e6e6e6]'>
      <Image
        alt={alt}
        src={imageSrc}
        fill
        sizes='312px'
        className='pointer-events-none absolute inset-0 max-w-none object-cover object-[50%_50%]'
        onError={handleImageError}
        quality={100}
      />
    </div>
  );
}

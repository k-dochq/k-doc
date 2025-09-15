'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalMainImageProps {
  imageUrl?: string | null;
  hospitalName: string;
}

export function HospitalMainImage({ imageUrl, hospitalName }: HospitalMainImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !imageUrl || imageError;

  return (
    <div className='relative h-full w-full'>
      <Image
        src={shouldShowDefaultImage ? DEFAULT_IMAGES.HOSPITAL_DEFAULT : imageUrl}
        alt={hospitalName}
        fill
        className='object-cover'
        priority
        onError={handleImageError}
      />
    </div>
  );
}

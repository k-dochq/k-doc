'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalCardImageProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardImage({ hospital, lang }: HospitalCardImageProps) {
  const [imageError, setImageError] = useState(false);
  const hospitalName = extractLocalizedText(hospital.name, lang);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowDefaultImage = !hospital.mainImageUrl || imageError;
  const imageSrc = shouldShowDefaultImage
    ? DEFAULT_IMAGES.HOSPITAL_DEFAULT
    : hospital.mainImageUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT;

  return (
    <div className='relative h-[216px] w-full overflow-hidden rounded-xl bg-neutral-300'>
      <Image
        src={imageSrc}
        alt={shouldShowDefaultImage ? `${hospitalName} 기본 이미지` : `${hospitalName} 썸네일`}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        onError={handleImageError}
      />
    </div>
  );
}

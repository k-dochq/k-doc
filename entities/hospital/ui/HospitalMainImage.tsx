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
      {/* 기본 이미지 배경 (blur 효과) - 이미지 로딩 전에만 표시 */}
      <Image
        src='/images/hospital-detail/default_hospital_detail3.png'
        alt=''
        fill
        className='absolute inset-0 object-cover blur-lg'
        priority
      />

      {/* 실제 이미지 또는 디폴트 이미지 오버레이 */}
      <Image
        src={shouldShowDefaultImage ? DEFAULT_IMAGES.HOSPITAL_DEFAULT : imageUrl}
        alt={hospitalName}
        fill
        className='relative z-10 object-cover'
        priority
        onError={handleImageError}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type DisplayImage } from '../model/types';
import { ImageTag } from './ImageTag';

interface DualImageDisplayProps {
  images: [DisplayImage, DisplayImage];
  type: 'before' | 'after';
  className?: string;
}

export function DualImageDisplay({ images, type, className = '' }: DualImageDisplayProps) {
  const [firstImage, secondImage] = images;
  const [firstImageError, setFirstImageError] = useState(false);
  const [secondImageError, setSecondImageError] = useState(false);

  const handleFirstImageError = () => {
    setFirstImageError(true);
  };

  const handleSecondImageError = () => {
    setSecondImageError(true);
  };

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* 첫 번째 이미지 (태그 포함) */}
      <div className='relative flex-1 overflow-hidden'>
        <Image
          src={firstImageError ? '/images/shared/default_image.png' : firstImage.imageUrl}
          alt={firstImage.alt || `${type === 'before' ? 'Before' : 'After'} 이미지 1`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 50vw, 168px'
          onError={handleFirstImageError}
        />
        <ImageTag type={type} />
      </div>

      {/* 두 번째 이미지 */}
      <div className='relative flex-1 overflow-hidden border-t border-white'>
        <Image
          src={secondImageError ? '/images/shared/default_image.png' : secondImage.imageUrl}
          alt={secondImage.alt || `${type === 'before' ? 'Before' : 'After'} 이미지 2`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 50vw, 168px'
          onError={handleSecondImageError}
        />
        <ImageTag type={type} />
      </div>
    </div>
  );
}

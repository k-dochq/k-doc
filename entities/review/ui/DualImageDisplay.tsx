'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type DisplayImage } from '../model/types';
import { ImageTag } from './ImageTag';

interface DualImageDisplayProps {
  images: [DisplayImage, DisplayImage];
  type: 'before' | 'after';
  className?: string;
  onFirstImageClick?: (e: React.MouseEvent) => void;
  onSecondImageClick?: (e: React.MouseEvent) => void;
  additionalImagesCount?: number;
}

export function DualImageDisplay({
  images,
  type,
  className = '',
  onFirstImageClick,
  onSecondImageClick,
  additionalImagesCount = 0,
}: DualImageDisplayProps) {
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
      <div className='relative flex-1 cursor-pointer overflow-hidden' onClick={onFirstImageClick}>
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
      <div
        className='relative flex-1 cursor-pointer overflow-hidden border-t border-white'
        onClick={onSecondImageClick}
      >
        <Image
          src={secondImageError ? '/images/shared/default_image.png' : secondImage.imageUrl}
          alt={secondImage.alt || `${type === 'before' ? 'Before' : 'After'} 이미지 2`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 50vw, 168px'
          onError={handleSecondImageError}
        />
        <ImageTag type={type} />

        {/* 추가 이미지 오버레이 */}
        {additionalImagesCount > 0 && (
          <div
            className='absolute inset-0 flex items-center justify-center'
            style={{ background: 'rgba(0, 0, 0, 0.40)' }}
          >
            <span className='text-sm font-semibold text-white'>+{additionalImagesCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

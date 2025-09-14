'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';

interface AfterImageSectionProps {
  afterImages: ReviewImage[];
  className?: string;
}

export function AfterImageSection({ afterImages, className = '' }: AfterImageSectionProps) {
  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // After 이미지 처리 (최대 2개)
  const displayAfterImages = afterImages.length > 0 ? afterImages.slice(0, 2) : [defaultImage];

  return (
    <div className={`flex h-full flex-1 flex-col border-l border-white ${className}`}>
      {displayAfterImages.length === 1 ? (
        <SingleImageDisplay image={displayAfterImages[0]} type='after' />
      ) : (
        <DualImageDisplay
          images={displayAfterImages as [DefaultImage, DefaultImage] | [ReviewImage, ReviewImage]}
          type='after'
        />
      )}
    </div>
  );
}

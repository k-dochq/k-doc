'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';

interface BeforeImageSectionProps {
  beforeImages: ReviewImage[];
  className?: string;
}

export function BeforeImageSection({ beforeImages, className = '' }: BeforeImageSectionProps) {
  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // Before 이미지 처리 (최대 2개)
  const displayBeforeImages = beforeImages.length > 0 ? beforeImages.slice(0, 2) : [defaultImage];

  return (
    <div className={`flex h-full flex-1 flex-col ${className}`}>
      {displayBeforeImages.length === 1 ? (
        <SingleImageDisplay image={displayBeforeImages[0]} type='before' />
      ) : (
        <DualImageDisplay
          images={displayBeforeImages as [DefaultImage, DefaultImage] | [ReviewImage, ReviewImage]}
          type='before'
        />
      )}
    </div>
  );
}

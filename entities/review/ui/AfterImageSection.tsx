'use client';

import { useEffect } from 'react';
import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Locale } from 'shared/config';
import { ReviewImageType } from '@prisma/client';

interface AfterImageSectionProps {
  afterImages: ReviewImage[];
  beforeImagesCount: number; // Before 이미지 개수 추가
  reviewId: string;
  lang: Locale;
  className?: string;
}

export function AfterImageSection({
  afterImages,
  beforeImagesCount,
  reviewId,
  lang,
  className = '',
}: AfterImageSectionProps) {
  const router = useLocalizedRouter();

  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // After 이미지 처리 (최대 2개)
  const displayAfterImages = afterImages.length > 0 ? afterImages.slice(0, 2) : [defaultImage];

  // After 이미지의 첫 번째 인덱스 계산
  const afterFirstIndex = beforeImagesCount;

  // 페이지 prefetch
  useEffect(() => {
    router.prefetch(`/review-images/${reviewId}?index=${afterFirstIndex}`);
  }, [router, reviewId, afterFirstIndex]);

  const handleImageClick = (imageIndex: number) => (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 상위 LocaleLink가 동작하지 않도록 함
    e.preventDefault();
    e.stopPropagation();

    // After 이미지의 해당 인덱스로 이동 (전체 이미지 배열에서 인덱스)
    const globalIndex = beforeImagesCount + imageIndex;
    router.push(`/review-images/${reviewId}?index=${globalIndex}`);
  };

  return (
    <div className={`flex h-full flex-1 flex-col border-l border-white ${className}`}>
      {displayAfterImages.length === 1 ? (
        <SingleImageDisplay
          image={displayAfterImages[0]}
          type='after'
          onImageClick={handleImageClick(0)}
        />
      ) : (
        <DualImageDisplay
          images={displayAfterImages as [DefaultImage, DefaultImage] | [ReviewImage, ReviewImage]}
          type='after'
          onFirstImageClick={handleImageClick(0)}
          onSecondImageClick={handleImageClick(1)}
        />
      )}
    </div>
  );
}

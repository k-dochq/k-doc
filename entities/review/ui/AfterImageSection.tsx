'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Locale } from 'shared/config';

interface AfterImageSectionProps {
  afterImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  className?: string;
}

export function AfterImageSection({
  afterImages,
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

  const handleImageClick = (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 상위 LocaleLink가 동작하지 않도록 함
    e.preventDefault();
    e.stopPropagation();

    // 이미지 페이지로 이동
    router.push(`/review-images/${reviewId}`);
  };

  return (
    <div
      className={`flex h-full flex-1 cursor-pointer flex-col border-l border-white ${className}`}
      onClick={handleImageClick}
    >
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

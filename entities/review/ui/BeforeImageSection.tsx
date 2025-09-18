'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Locale } from 'shared/config';
import { ReviewImageType } from '@prisma/client';

interface BeforeImageSectionProps {
  beforeImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  className?: string;
}

export function BeforeImageSection({
  beforeImages,
  reviewId,
  lang,
  className = '',
}: BeforeImageSectionProps) {
  const router = useLocalizedRouter();

  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // Before 이미지 처리 (최대 2개)
  const displayBeforeImages = beforeImages.length > 0 ? beforeImages.slice(0, 2) : [defaultImage];

  const handleImageClick = (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 상위 LocaleLink가 동작하지 않도록 함
    e.preventDefault();
    e.stopPropagation();

    // Before 이미지의 첫 번째로 이동 (전체 이미지 배열에서 인덱스 0)
    router.push(`/review-images/${reviewId}?index=0`);
  };

  return (
    <div
      className={`flex h-full flex-1 cursor-pointer flex-col ${className}`}
      onClick={handleImageClick}
    >
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

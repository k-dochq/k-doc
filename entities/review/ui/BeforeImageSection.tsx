'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';
import { type Locale } from 'shared/config';
import { ReviewImageType } from '@prisma/client';

interface BeforeImageSectionProps {
  beforeImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  onImageClick: (index: number) => void;
  className?: string;
  shouldLimitDisplay?: boolean; // Before/After 모두 2개 이상일 때 3개로 제한하는 플래그
  totalBeforeCount?: number; // 전체 Before 이미지 개수
}

export function BeforeImageSection({
  beforeImages,
  reviewId,
  lang,
  onImageClick,
  className = '',
  shouldLimitDisplay = false,
  totalBeforeCount = 0,
}: BeforeImageSectionProps) {
  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // Before 이미지 처리 (최대 2개)
  const displayBeforeImages = beforeImages.length > 0 ? beforeImages.slice(0, 2) : [defaultImage];

  // 추가 이미지 개수 계산
  // shouldLimitDisplay가 true이면 Before 영역에서는 추가 이미지 표시 안 함 (After 영역에서 표시)
  const additionalImagesCount = shouldLimitDisplay ? 0 : (beforeImages.length > 2 ? beforeImages.length - 2 : 0);

  const handleImageClick = (imageIndex: number) => (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 상위 LocaleLink가 동작하지 않도록 함
    e.preventDefault();
    e.stopPropagation();

    // Before 이미지의 해당 인덱스로 상위 컴포넌트에 전달
    onImageClick(imageIndex);
  };

  return (
    <div className={`flex h-full w-full flex-col ${className}`}>
      {displayBeforeImages.length === 1 ? (
        <SingleImageDisplay
          image={displayBeforeImages[0]}
          type='before'
          onImageClick={handleImageClick(0)}
        />
      ) : (
        <DualImageDisplay
          images={displayBeforeImages as [DefaultImage, DefaultImage] | [ReviewImage, ReviewImage]}
          type='before'
          onFirstImageClick={handleImageClick(0)}
          onSecondImageClick={handleImageClick(1)}
          additionalImagesCount={additionalImagesCount}
        />
      )}
    </div>
  );
}

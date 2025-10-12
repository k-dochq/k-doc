'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { DualImageDisplay } from './DualImageDisplay';
import { type Locale } from 'shared/config';
import { ReviewImageType } from '@prisma/client';

interface AfterImageSectionProps {
  afterImages: ReviewImage[];
  beforeImagesCount: number; // Before 이미지 개수 추가
  reviewId: string;
  lang: Locale;
  onImageClick: (index: number) => void;
  className?: string;
  shouldLimitDisplay?: boolean; // Before/After 모두 2개 이상일 때 3개로 제한하는 플래그
  totalAfterCount?: number; // 전체 After 이미지 개수
}

export function AfterImageSection({
  afterImages,
  beforeImagesCount,
  reviewId,
  lang,
  onImageClick,
  className = '',
  shouldLimitDisplay = false,
  totalAfterCount = 0,
}: AfterImageSectionProps) {
  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // After 이미지 처리 (최대 2개)
  const displayAfterImages = afterImages.length > 0 ? afterImages.slice(0, 2) : [defaultImage];

  // 추가 이미지 개수 계산
  // shouldLimitDisplay가 true이면 전체 추가 이미지 개수를 표시 (Before + After)
  // 예: Before 5개, After 3개 → (5 - 1) + (3 - 2) = 5개 추가
  const additionalImagesCount = shouldLimitDisplay 
    ? (beforeImagesCount - 1) + (totalAfterCount - 2)
    : (afterImages.length > 2 ? afterImages.length - 2 : 0);

  const handleImageClick = (imageIndex: number) => (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 상위 LocaleLink가 동작하지 않도록 함
    e.preventDefault();
    e.stopPropagation();

    // After 이미지의 해당 인덱스로 상위 컴포넌트에 전달 (전체 이미지 배열에서의 인덱스)
    const globalIndex = beforeImagesCount + imageIndex;
    onImageClick(globalIndex);
  };

  return (
    <div className={`flex h-full w-full flex-col border-l border-white ${className}`}>
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
          additionalImagesCount={additionalImagesCount}
        />
      )}
    </div>
  );
}

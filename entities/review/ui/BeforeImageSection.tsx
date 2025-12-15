'use client';

import { type ReviewImage, type DefaultImage } from '../model/types';
import { SingleImageDisplay } from './SingleImageDisplay';
import { type Locale } from 'shared/config';

interface BeforeImageSectionProps {
  beforeImages: ReviewImage[];
  reviewId: string;
  lang: Locale;
  onImageClick: (index: number) => void;
  className?: string;
}

export function BeforeImageSection({
  beforeImages,
  reviewId,
  lang,
  onImageClick,
  className = '',
}: BeforeImageSectionProps) {
  // 기본 이미지 설정 [[memory:8795787]]
  const defaultImage: DefaultImage = {
    imageUrl: '/images/shared/default_image.png',
    alt: '기본 이미지',
  };

  // Before 이미지 처리 (항상 첫 번째 이미지만)
  const displayImage = beforeImages.length > 0 ? beforeImages[0] : defaultImage;

  const handleImageClick = (e: React.MouseEvent) => {
    // 이벤트 전파를 막아서 상위 LocaleLink가 동작하지 않도록 함
    e.preventDefault();
    e.stopPropagation();

    // Before 이미지의 첫 번째 인덱스로 상위 컴포넌트에 전달
    onImageClick(0);
  };

  return (
    <div className={`flex h-full flex-1 flex-col ${className}`}>
      <SingleImageDisplay image={displayImage} type='before' onImageClick={handleImageClick} />
    </div>
  );
}

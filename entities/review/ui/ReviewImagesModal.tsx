'use client';

import { useState, useEffect } from 'react';
import { ImageModalCarousel, type ImageModalItem } from 'shared/ui/image-modal-carousel';
import { type ReviewImage } from '../model/types';
import { type Dictionary } from 'shared/model/types';
import { generateReviewImagesHeaderText } from '@/features/review-images/model/header-text-generator';
import { processReviewImages, type ReviewImagesData } from '../model/image-navigation';

interface ReviewImagesModalProps {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
}

export function ReviewImagesModal({
  beforeImages,
  afterImages,
  initialIndex,
  isOpen,
  onClose,
  dict,
}: ReviewImagesModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 모든 이미지를 하나의 배열로 합치기 (before 먼저, 그 다음 after)
  const allImages: ReviewImage[] = [...beforeImages, ...afterImages];

  // ImageModalItem 형태로 변환
  const modalImages: ImageModalItem[] = allImages.map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    alt: image.alt || '리뷰 이미지',
  }));

  // ReviewImagesData 형태로 데이터 구성
  const imagesData: ReviewImagesData = processReviewImages(beforeImages, afterImages);

  // 현재 인덱스가 변경될 때마다 헤더 텍스트 생성
  const headerText = generateReviewImagesHeaderText(imagesData, currentIndex, dict);

  // 초기 인덱스가 변경될 때마다 현재 인덱스 업데이트
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  return (
    <ImageModalCarousel
      images={modalImages}
      initialIndex={initialIndex}
      isOpen={isOpen}
      onClose={onClose}
      centerText={headerText || undefined}
      onIndexChange={setCurrentIndex}
    />
  );
}

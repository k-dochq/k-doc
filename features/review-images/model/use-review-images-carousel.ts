'use client';

import { useState, useEffect, useCallback } from 'react';
import { type CarouselApi } from 'shared/ui/carousel';
import { type ReviewImagesData } from 'entities/review/model/image-navigation';

interface UseReviewImagesCarouselProps {
  imagesData: ReviewImagesData;
  initialIndex?: number;
}

interface UseReviewImagesCarouselReturn {
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi) => void;
  currentIndex: number;
  currentImageId: string | null;
  goToIndex: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

/**
 * 리뷰 이미지 carousel을 제어하는 훅
 */
export function useReviewImagesCarousel({
  imagesData,
  initialIndex = 0,
}: UseReviewImagesCarouselProps): UseReviewImagesCarouselReturn {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 현재 이미지 ID 계산
  const currentImageId = imagesData.allImages[currentIndex]?.id || null;

  // 초기 인덱스 설정
  useEffect(() => {
    if (!api) return;

    // 유효한 인덱스 범위 확인
    const validIndex = Math.max(0, Math.min(initialIndex, imagesData.allImages.length - 1));

    // 초기 위치로 스크롤 (애니메이션 없이)
    api.scrollTo(validIndex, false);
    setCurrentIndex(validIndex);
  }, [api, initialIndex, imagesData.allImages.length]);

  // carousel 선택 이벤트 처리
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentIndex(selectedIndex);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // 특정 인덱스로 이동
  const goToIndex = useCallback(
    (index: number) => {
      if (!api) return;

      const validIndex = Math.max(0, Math.min(index, imagesData.allImages.length - 1));
      api.scrollTo(validIndex);
    },
    [api, imagesData.allImages.length],
  );

  // 다음 이미지로 이동
  const goToNext = useCallback(() => {
    if (!api) return;
    api.scrollNext();
  }, [api]);

  // 이전 이미지로 이동
  const goToPrevious = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
  }, [api]);

  return {
    api,
    setApi,
    currentIndex,
    currentImageId,
    goToIndex,
    goToNext,
    goToPrevious,
  };
}

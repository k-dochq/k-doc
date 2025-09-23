'use client';

import { useMemo } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useReviewDetail } from 'entities/review/model/useReviewDetail';
import { ReviewImagesHeader } from 'features/review-images/ui/ReviewImagesHeader';
import { ReviewImagesCarousel } from 'features/review-images/ui/ReviewImagesCarousel';
import { ReviewImagesSkeleton } from 'features/review-images/ui/ReviewImagesSkeleton';
import { ReviewImagesErrorState } from 'features/review-images/ui/ReviewImagesErrorState';
import { ReviewImagesEmptyState } from 'features/review-images/ui/ReviewImagesEmptyState';
import { processReviewImages } from 'entities/review/model/image-navigation';
import {
  generateReviewImagesHeaderText,
  useReviewImagesCarousel,
} from 'features/review-images/model';

interface ReviewImagesContentProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewImagesContent({ reviewId, lang, dict }: ReviewImagesContentProps) {
  // 리뷰 데이터 조회
  const { data: reviewData, isLoading, error } = useReviewDetail({ reviewId });

  // 이미지 데이터 처리
  const imagesData = useMemo(() => {
    if (!reviewData?.review?.images) {
      return null;
    }

    return processReviewImages(
      reviewData.review.images.before || [],
      reviewData.review.images.after || [],
    );
  }, [reviewData]);

  // carousel 컨트롤러
  const carousel = useReviewImagesCarousel({
    imagesData: imagesData || { allImages: [], beforeImages: [], afterImages: [] },
  });

  // 헤더 텍스트 생성
  const headerText = useMemo(() => {
    if (!imagesData || carousel.currentIndex === undefined) {
      return null;
    }

    return generateReviewImagesHeaderText(imagesData, carousel.currentIndex, dict);
  }, [imagesData, carousel.currentIndex, dict]);

  // 로딩 상태
  if (isLoading) {
    return <ReviewImagesSkeleton lang={lang} />;
  }

  // 에러 상태
  if (error) {
    return <ReviewImagesErrorState lang={lang} error={error} />;
  }

  // 이미지가 없는 경우
  if (!imagesData || imagesData.allImages.length === 0) {
    return <ReviewImagesEmptyState lang={lang} />;
  }

  return (
    <div className='bg-gradient-primary flex min-h-screen flex-col'>
      {/* 헤더 */}
      <ReviewImagesHeader headerText={headerText} lang={lang} />

      {/* 이미지 캐러셀 */}
      <ReviewImagesCarousel imagesData={imagesData} setApi={carousel.setApi} />
    </div>
  );
}

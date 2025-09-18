'use client';

import { useMemo } from 'react';
import { type Locale } from 'shared/config';
import { useReviewDetail } from 'entities/review/model/useReviewDetail';
import { ReviewImagesHeader } from 'features/review-images/ui/ReviewImagesHeader';
import { ReviewImagesCarousel } from 'features/review-images/ui/ReviewImagesCarousel';
import { ReviewImagesSkeleton } from 'features/review-images/ui/ReviewImagesSkeleton';
import { ReviewImagesErrorState } from 'features/review-images/ui/ReviewImagesErrorState';
import { ReviewImagesEmptyState } from 'features/review-images/ui/ReviewImagesEmptyState';
import { processReviewImages } from 'entities/review/model/image-navigation';

interface ReviewImagesContentProps {
  reviewId: string;
  lang: Locale;
}

export function ReviewImagesContent({ reviewId, lang }: ReviewImagesContentProps) {
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
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 헤더 */}
      <ReviewImagesHeader navigationData={null} lang={lang} />

      {/* 이미지 캐러셀 */}
      <ReviewImagesCarousel imagesData={imagesData} />
    </div>
  );
}

'use client';

import { useEffect, useMemo } from 'react';
import { type Locale } from 'shared/config';
import { useReviewDetail } from 'entities/review/model/useReviewDetail';
import { ReviewImagesHeader } from 'features/review-images/ui/ReviewImagesHeader';
import { ReviewImagesSkeleton } from 'features/review-images/ui/ReviewImagesSkeleton';
import { ReviewImagesErrorState } from 'features/review-images/ui/ReviewImagesErrorState';
import { ReviewImagesEmptyState } from 'features/review-images/ui/ReviewImagesEmptyState';
import { ReviewImageType } from '@prisma/client';
import {
  processReviewImages,
  calculateImageNavigation,
  parseImageParams,
  findImageByTypeAndIndex,
  type ImageType,
} from 'entities/review/model/image-navigation';

interface ReviewImagesContentProps {
  reviewId: string;
  lang: Locale;
  initialImageType?: string;
  initialImageIndex?: string;
}

export function ReviewImagesContent({
  reviewId,
  lang,
  initialImageType,
  initialImageIndex,
}: ReviewImagesContentProps) {
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

  // URL 파라미터로부터 현재 이미지 결정
  const currentImageId = useMemo(() => {
    if (!imagesData || !initialImageType || !initialImageIndex) {
      // 파라미터가 없으면 첫 번째 이미지 사용
      return imagesData?.allImages[0]?.id || null;
    }

    const imageType = initialImageType as ImageType;
    const imageIndex = parseInt(initialImageIndex, 10);

    if (imageType !== ReviewImageType.BEFORE && imageType !== ReviewImageType.AFTER) {
      return imagesData?.allImages[0]?.id || null;
    }

    return findImageByTypeAndIndex(imagesData, imageType, imageIndex);
  }, [imagesData, initialImageType, initialImageIndex]);

  // 네비게이션 데이터 계산
  const navigationData = useMemo(() => {
    if (!imagesData || !currentImageId) {
      return null;
    }

    return calculateImageNavigation(imagesData, currentImageId);
  }, [imagesData, currentImageId]);

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

  const currentImage = imagesData.allImages.find((img) => img.id === currentImageId);

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 헤더 */}
      <ReviewImagesHeader navigationData={navigationData} lang={lang} />

      {/* 이미지 영역 */}
      <div className='flex flex-1 items-center justify-center p-4'>
        {currentImage ? (
          <img
            src={currentImage.imageUrl}
            alt={currentImage.alt || '리뷰 이미지'}
            className='max-h-full max-w-full object-contain'
          />
        ) : (
          <div className='text-center text-gray-600'>
            <p>이미지를 찾을 수 없습니다.</p>
          </div>
        )}
      </div>

      {/* 하단 네비게이션 (추후 구현 가능) */}
      <div className='border-t border-gray-200 bg-gray-50 p-4'>
        <div className='text-center text-sm text-gray-600'>
          {navigationData && (
            <span>
              {navigationData.currentIndex} / {navigationData.totalCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

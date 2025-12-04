'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { usePopularReviews } from 'entities/review';
import { PopularReviewsCarouselV2 } from './PopularReviewsCarouselV2';
import { PopularReviewsCarouselV2Skeleton } from './PopularReviewsCarouselV2Skeleton';

interface PopularReviewsCarouselV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: MedicalSpecialtyType | 'ALL';
}

function PopularReviewsCarouselV2Content({
  lang,
  dict,
  selectedCategory,
}: PopularReviewsCarouselV2WrapperProps) {
  const {
    data: popularReviews,
    isLoading,
    error,
  } = usePopularReviews({
    category: selectedCategory,
    limit: 5,
  });

  // placeholderData로 인해 isLoading이어도 이전 데이터가 표시될 수 있음
  // 데이터가 있으면 항상 렌더링하고, 데이터가 없고 로딩 중일 때만 스켈레톤 표시
  if (popularReviews && popularReviews.reviews.length > 0) {
    return <PopularReviewsCarouselV2 reviews={popularReviews.reviews} lang={lang} dict={dict} />;
  }

  if (isLoading) {
    return <PopularReviewsCarouselV2Skeleton />;
  }

  if (error) {
    return null;
  }

  if (!popularReviews || popularReviews.reviews.length === 0) {
    return (
      <div className='py-8 text-center text-gray-500'>{dict.popularReviews.empty.message}</div>
    );
  }

  return null;
}

export function PopularReviewsCarouselV2Wrapper({
  lang,
  dict,
  selectedCategory,
}: PopularReviewsCarouselV2WrapperProps) {
  return (
    <Suspense fallback={<PopularReviewsCarouselV2Skeleton />}>
      <PopularReviewsCarouselV2Content
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
      />
    </Suspense>
  );
}

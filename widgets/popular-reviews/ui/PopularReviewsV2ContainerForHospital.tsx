'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { usePopularReviewsV2 } from 'entities/review/api/queries/use-popular-reviews-v2';
import { PopularReviewsTitleV2ForHospital } from './PopularReviewsTitleV2ForHospital';
import { HospitalReviewStatsV2 } from './HospitalReviewStatsV2';
import { PopularReviewsCarouselV2 } from './PopularReviewsCarouselV2';
import { PopularReviewsCarouselV2Skeleton } from './PopularReviewsCarouselV2Skeleton';

interface PopularReviewsV2ContainerForHospitalProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

function PopularReviewsV2Content({
  hospitalId,
  lang,
  dict,
}: PopularReviewsV2ContainerForHospitalProps) {
  const {
    data: popularReviews,
    isLoading,
    error,
  } = usePopularReviewsV2({
    hospitalId,
    limit: 5,
    hasBothImages: false,
  });

  // 데이터가 없으면 섹션 전체를 렌더링하지 않음
  if (!isLoading && (!popularReviews || popularReviews.reviews.length === 0)) {
    return null;
  }

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <PopularReviewsTitleV2ForHospital hospitalId={hospitalId} lang={lang} dict={dict} />
        <div className='h-3' />
        <HospitalReviewStatsV2 hospitalId={hospitalId} lang={lang} dict={dict} />
        <div className='h-3' />
        <PopularReviewsCarouselV2Skeleton />
      </>
    );
  }

  if (popularReviews && popularReviews.reviews.length > 0) {
    return (
      <>
        <PopularReviewsTitleV2ForHospital hospitalId={hospitalId} lang={lang} dict={dict} />
        <div className='h-3' />
        <HospitalReviewStatsV2 hospitalId={hospitalId} lang={lang} dict={dict} />
        <div className='h-3' />
        <PopularReviewsCarouselV2 reviews={popularReviews.reviews} lang={lang} dict={dict} />
      </>
    );
  }

  return null;
}

export function PopularReviewsV2ContainerForHospital({
  hospitalId,
  lang,
  dict,
}: PopularReviewsV2ContainerForHospitalProps) {
  return (
    <Suspense fallback={<PopularReviewsCarouselV2Skeleton />}>
      <PopularReviewsV2Content hospitalId={hospitalId} lang={lang} dict={dict} />
    </Suspense>
  );
}

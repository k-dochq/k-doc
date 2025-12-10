'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLiveReviews } from 'entities/live-review/api/queries/use-live-reviews';
import { LiveReviewTitleV2 } from './LiveReviewTitleV2';
import { LiveReviewCarouselV2 } from './LiveReviewCarouselV2';
import { LiveReviewCarouselV2Skeleton } from './LiveReviewCarouselV2Skeleton';

interface LiveReviewV2ContainerForHospitalProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function LiveReviewV2ContainerForHospital({
  hospitalId,
  lang,
  dict,
}: LiveReviewV2ContainerForHospitalProps) {
  const {
    data: liveReviews,
    isLoading,
    error,
  } = useLiveReviews({
    hospitalId,
    page: 1,
  });

  // 데이터가 없으면 섹션 전체를 렌더링하지 않음
  if (!isLoading && (!liveReviews || liveReviews.length === 0)) {
    return null;
  }

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='bg-primary-200 py-12'>
        <LiveReviewTitleV2 lang={lang} dict={dict} />
        <div className='h-4' />
        <LiveReviewCarouselV2Skeleton />
      </div>
    );
  }

  if (liveReviews && liveReviews.length > 0) {
    return (
      <div className='bg-primary-200 py-12'>
        <LiveReviewTitleV2 lang={lang} dict={dict} />
        <div className='h-4' />
        <LiveReviewCarouselV2 liveReviews={liveReviews} lang={lang} dict={dict} />
      </div>
    );
  }

  return null;
}

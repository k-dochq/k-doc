'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { useLiveReviews } from 'entities/live-review/api/queries/use-live-reviews';
import { EmptyLiveReviewsState } from 'shared/ui/empty-state';
import { LiveReviewCarouselV2 } from './LiveReviewCarouselV2';
import { LiveReviewCarouselV2Skeleton } from './LiveReviewCarouselV2Skeleton';

interface LiveReviewCarouselV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: MedicalSpecialtyType | 'ALL';
}

function LiveReviewCarouselV2Content({
  lang,
  dict,
  selectedCategory,
}: LiveReviewCarouselV2WrapperProps) {
  const {
    data: liveReviews,
    isLoading,
    error,
  } = useLiveReviews({
    category: selectedCategory,
    limit: 3,
    page: 1,
  });

  // placeholderData로 인해 isLoading이어도 이전 데이터가 표시될 수 있음
  // 데이터가 있으면 항상 렌더링하고, 데이터가 없고 로딩 중일 때만 스켈레톤 표시
  if (liveReviews && liveReviews.length > 0) {
    return <LiveReviewCarouselV2 liveReviews={liveReviews} lang={lang} dict={dict} />;
  }

  if (isLoading) {
    return <LiveReviewCarouselV2Skeleton />;
  }

  if (error) {
    return null;
  }

  if (!liveReviews || liveReviews.length === 0) {
    return <EmptyLiveReviewsState dict={dict} className='min-h-0 py-8' />;
  }

  return null;
}

export function LiveReviewCarouselV2Wrapper({
  lang,
  dict,
  selectedCategory,
}: LiveReviewCarouselV2WrapperProps) {
  return (
    <Suspense fallback={<LiveReviewCarouselV2Skeleton />}>
      <LiveReviewCarouselV2Content lang={lang} dict={dict} selectedCategory={selectedCategory} />
    </Suspense>
  );
}

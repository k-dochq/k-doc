'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { usePopularReviewsV2 } from 'entities/review/api/queries/use-popular-reviews-v2';
import { useHospitalReviewStats } from 'entities/review/api/queries/use-hospital-review-stats';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { PopularReviewsTitleV2ForHospital } from './PopularReviewsTitleV2ForHospital';
import { HospitalReviewStatsV2 } from './HospitalReviewStatsV2';
import { PopularReviewsCarouselV2 } from './PopularReviewsCarouselV2';
import { PopularReviewsCarouselV2Skeleton } from './PopularReviewsCarouselV2Skeleton';

interface PopularReviewsV2ContainerForHospitalProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  titleOverride?: string;
  limit?: number;
  showStats?: boolean;
  sort?: ReviewSortOption;
}

function PopularReviewsV2Content({
  hospitalId,
  lang,
  dict,
  titleOverride,
  limit = 5,
  showStats = true,
  sort = REVIEW_SORT_OPTIONS.LATEST,
}: PopularReviewsV2ContainerForHospitalProps) {
  const {
    data: popularReviews,
    isLoading,
    error,
  } = usePopularReviewsV2({
    hospitalId,
    limit,
    hasBothImages: false,
    sort,
  });
  const { data: reviewStats } = useHospitalReviewStats(hospitalId);

  const hasVisibleReviews =
    popularReviews && popularReviews.reviews.length > 0;
  const hasAnyReviewsIncludingHidden =
    reviewStats != null && reviewStats.reviewCount > 0;

  // 노출 리뷰가 0개일 때: 전체 리뷰(숨김 포함)가 있으면 타이틀+별점+개수만 노출, 캐러셀은 미노출
  if (!isLoading && (!popularReviews || popularReviews.reviews.length === 0)) {
    if (hasAnyReviewsIncludingHidden) {
      return (
        <>
          <PopularReviewsTitleV2ForHospital
            hospitalId={hospitalId}
            lang={lang}
            dict={dict}
            titleOverride={titleOverride}
            hasVisibleReviews={hasVisibleReviews}
          />
          {showStats && (
            <>
              <div className='h-3' />
              <HospitalReviewStatsV2 hospitalId={hospitalId} lang={lang} dict={dict} />
            </>
          )}
        </>
      );
    }
    return null;
  }

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='pl-2'>
        <PopularReviewsTitleV2ForHospital
          hospitalId={hospitalId}
          lang={lang}
          dict={dict}
          titleOverride={titleOverride}
          hasVisibleReviews={hasVisibleReviews}
        />
        {showStats && (
          <>
            <div className='h-3' />
            <HospitalReviewStatsV2 hospitalId={hospitalId} lang={lang} dict={dict} />
          </>
        )}
        <div className='h-3' />
        <PopularReviewsCarouselV2Skeleton />
      </div>
    );
  }

  if (popularReviews && popularReviews.reviews.length > 0) {
    return (
      <>
        <PopularReviewsTitleV2ForHospital
          hospitalId={hospitalId}
          lang={lang}
          dict={dict}
          titleOverride={titleOverride}
          hasVisibleReviews={hasVisibleReviews}
        />
        {showStats && (
          <>
            <div className='h-3' />
            <HospitalReviewStatsV2 hospitalId={hospitalId} lang={lang} dict={dict} />
          </>
        )}
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
  titleOverride,
  limit,
  showStats,
  sort = REVIEW_SORT_OPTIONS.LATEST,
}: PopularReviewsV2ContainerForHospitalProps) {
  return (
    <Suspense fallback={<PopularReviewsCarouselV2Skeleton />}>
      <PopularReviewsV2Content
        hospitalId={hospitalId}
        lang={lang}
        dict={dict}
        titleOverride={titleOverride}
        limit={limit}
        showStats={showStats}
        sort={sort}
      />
    </Suspense>
  );
}

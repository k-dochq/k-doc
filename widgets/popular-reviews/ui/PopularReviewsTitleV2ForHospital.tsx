'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ArrowRightIconFigma } from 'shared/ui/arrow-right-icon-figma';

interface PopularReviewsTitleV2ForHospitalProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  titleOverride?: string;
  /** 활성(노출) 리뷰가 1개 이상일 때만 View All 클릭 시 이동. 기본값 true(기존 동작 유지) */
  hasVisibleReviews?: boolean;
}

export function PopularReviewsTitleV2ForHospital({
  hospitalId,
  lang,
  dict,
  titleOverride,
  hasVisibleReviews = true,
}: PopularReviewsTitleV2ForHospitalProps) {
  const router = useLocalizedRouter();

  const handleViewAll = () => {
    if (hasVisibleReviews === false) return;
    router.push(`/hospital/${hospitalId}/reviews`);
  };

  const viewAllDisabled = hasVisibleReviews === false;

  return (
    <div className='flex w-full items-center justify-between px-5'>
      <h2 className='text-lg font-semibold text-neutral-700'>
        {titleOverride || dict.hospitalReviews.title}
      </h2>

      <button
        type='button'
        onClick={handleViewAll}
        disabled={viewAllDisabled}
        className='flex items-center gap-0.5 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60'
        aria-label={dict.popularReviews.viewAll}
        aria-disabled={viewAllDisabled}
      >
        <span className='text-sm leading-5 font-medium text-neutral-500'>
          {dict.popularReviews.viewAll}
        </span>
        <div className='flex size-4 shrink-0 items-center justify-center'>
          <ArrowRightIconFigma size={7} color='#737373' />
        </div>
      </button>
    </div>
  );
}

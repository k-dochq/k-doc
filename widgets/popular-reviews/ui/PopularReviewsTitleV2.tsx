'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { ArrowRightIconFigma } from 'shared/ui/arrow-right-icon-figma';

interface PopularReviewsTitleV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviewsTitleV2({ lang, dict }: PopularReviewsTitleV2Props) {
  const router = useLocalizedRouter();

  const handleViewAll = () => {
    router.push('/reviews');
  };

  return (
    <div className='flex w-full items-center justify-between px-5'>
      <h2 className='text-2xl leading-8 font-semibold text-neutral-700'>
        {dict.popularReviews.title}
      </h2>

      <button
        onClick={handleViewAll}
        className='flex items-center gap-0.5 transition-opacity hover:opacity-80'
        aria-label={dict.popularReviews.viewAll}
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

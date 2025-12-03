'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface LiveReviewTitleV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function LiveReviewTitleV2({ lang, dict }: LiveReviewTitleV2Props) {
  return (
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-2xl leading-8 font-semibold text-neutral-700'>
        {dict.liveReviews.title}
      </h2>
    </div>
  );
}

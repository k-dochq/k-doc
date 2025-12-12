'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface LiveReviewTitleV2MainProps {
  lang: Locale;
  dict: Dictionary;
}

export function LiveReviewTitleV2Main({ lang, dict }: LiveReviewTitleV2MainProps) {
  return (
    <div className='flex w-full items-center justify-between px-5'>
      <h2 className='text-2xl font-semibold text-neutral-700'>{dict.liveReviews.title}</h2>
    </div>
  );
}

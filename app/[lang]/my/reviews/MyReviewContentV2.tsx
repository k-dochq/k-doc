'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MyReviewsInfiniteListV2 } from './MyReviewsInfiniteListV2';

interface MyReviewContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function MyReviewContentV2({ lang, dict }: MyReviewContentV2Props) {
  return (
    <div className=''>
      <MyReviewsInfiniteListV2 lang={lang} dict={dict} />
    </div>
  );
}

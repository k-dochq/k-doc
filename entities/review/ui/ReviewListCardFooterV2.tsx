'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { ReviewHashtagsV2 } from './ReviewHashtagsV2';
import { ReviewProcedureTiming } from './ReviewProcedureTiming';

interface ReviewListCardFooterV2Props {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function ReviewListCardFooterV2({
  review,
  lang,
  dict,
  className = '',
}: ReviewListCardFooterV2Props) {
  // 해시태그 추출 (concernsMultilingual을 해시태그로 사용)
  const concerns = extractLocalizedText(review.concernsMultilingual, lang) || '';
  const hashtags = concerns ? [concerns] : [];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* 해시태그 */}
      {hashtags.length > 0 && (
        <div className='flex items-center gap-1'>
          <ReviewHashtagsV2 hashtags={hashtags} />
        </div>
      )}

      {/* 시술시기와 조회수 */}
      <div className='flex items-center justify-between'>
        {/* 시술시기 */}
        <ReviewProcedureTiming createdAt={review.createdAt} lang={lang} dict={dict} />

        {/* 조회수 */}
        <div className='flex items-center gap-1'>
          <span className='text-xs leading-4 font-medium text-neutral-700'>{dict.review.view}</span>
          <span className='text-xs leading-4 font-medium text-neutral-700'>{review.viewCount}</span>
        </div>
      </div>
    </div>
  );
}

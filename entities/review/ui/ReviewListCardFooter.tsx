'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { ReviewHashtags } from './ReviewHashtags';
import { ReviewProcedureTiming } from './ReviewProcedureTiming';

interface ReviewListCardFooterProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function ReviewListCardFooter({
  review,
  lang,
  dict,
  className = '',
}: ReviewListCardFooterProps) {
  // 해시태그 추출 (concernsMultilingual을 해시태그로 사용)
  const concerns = extractLocalizedText(review.concernsMultilingual, lang) || '';
  const hashtags = concerns ? [concerns] : [];

  return (
    <div className={`${className}`}>
      {/* 해시태그 */}
      {hashtags.length > 0 && <ReviewHashtags hashtags={hashtags} />}

      {/* 시술시기 */}
      <ReviewProcedureTiming createdAt={review.createdAt} lang={lang} dict={dict} />
    </div>
  );
}

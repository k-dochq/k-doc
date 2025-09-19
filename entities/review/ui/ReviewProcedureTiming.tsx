'use client';

import { type Locale } from 'shared/config';
import { formatDate } from 'shared/lib/date-utils';

interface ReviewProcedureTimingProps {
  createdAt: Date;
  lang: Locale;
  dict: {
    review: {
      procedureTiming: string;
      showMore: string;
      showLess: string;
    };
  };
  className?: string;
}

export function ReviewProcedureTiming({
  createdAt,
  lang,
  dict,
  className = '',
}: ReviewProcedureTimingProps) {
  const timingText = formatDate(createdAt, lang, 'YYYY년 M월 D일');

  return (
    <div className={`${className}`}>
      <span className='text-xs font-medium text-neutral-500'>
        {dict.review.procedureTiming} {timingText}
      </span>
    </div>
  );
}

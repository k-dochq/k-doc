'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { EyeIcon } from 'shared/ui/icons/EyeIcon';
import { HeartOutlineIcon } from 'shared/ui/icons/HeartOutlineIcon';

interface ReviewStatsSectionProps {
  review: ReviewCardData;
  lang: Locale;
  className?: string;
}

export function ReviewStatsSection({ review, lang, className = '' }: ReviewStatsSectionProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* 조회수 */}
      <div className='flex items-center gap-1'>
        <EyeIcon className='text-sm text-neutral-400' />
        <span className='text-sm font-medium text-neutral-400'>{review.viewCount}</span>
      </div>

      {/* 좋아요 */}
      <div className='flex items-center gap-1'>
        <HeartOutlineIcon className='text-neutral-400' width={16} height={14} />
        <span className='text-xs font-medium text-neutral-400'>{review.likeCount}</span>
      </div>
    </div>
  );
}

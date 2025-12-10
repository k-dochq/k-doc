'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { StarIconFigma } from 'shared/ui/star-icon-figma';
import { useHospitalReviewStats } from 'entities/review/api/queries/use-hospital-review-stats';

interface HospitalReviewStatsV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  className?: string;
  showPadding?: boolean;
}

export function HospitalReviewStatsV2({
  hospitalId,
  lang,
  dict,
  className = '',
  showPadding = true,
}: HospitalReviewStatsV2Props) {
  const { data: reviewStats, isLoading } = useHospitalReviewStats(hospitalId);

  // 로딩 중이거나 데이터가 없으면 blur 처리된 기본값 표시
  if (isLoading || !reviewStats) {
    const reviewCountText = dict.popularReviews.reviewCount;
    const reviewCountParts = reviewCountText.split('{count}');

    return (
      <div className={`flex items-center gap-1 ${showPadding ? 'px-5' : ''} ${className}`}>
        <div className='flex shrink-0 items-center justify-center'>
          <StarIconFigma size={24} color='#FFC31D' />
        </div>
        <div className='flex items-center gap-[6px]'>
          <p className='text-lg leading-7 font-bold text-neutral-700'>
            <span className='blur-xs'>5.0</span>
          </p>
          <div className='size-[3px] shrink-0 rounded-full bg-neutral-300' />
          <p className='text-base leading-6 font-semibold text-neutral-700'>
            {reviewCountParts[0]}
            <span className='blur-xs'>10</span>
            {reviewCountParts[1]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${showPadding ? 'px-5' : ''} ${className}`}>
      <div className='flex shrink-0 items-center justify-center'>
        <StarIconFigma size={24} color='#FFC31D' />
      </div>
      <div className='flex items-center gap-[6px]'>
        <p className='text-lg leading-7 font-bold text-neutral-700'>
          {reviewStats.averageRating.toFixed(1)}
        </p>
        <div className='size-[3px] shrink-0 rounded-full bg-neutral-300' />
        <p className='text-base leading-6 font-semibold text-neutral-700'>
          {dict.popularReviews.reviewCount.replace('{count}', reviewStats.reviewCount.toString())}
        </p>
      </div>
    </div>
  );
}

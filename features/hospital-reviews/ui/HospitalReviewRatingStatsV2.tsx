'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalReviewStats } from 'entities/review/api/queries/use-hospital-review-stats';
import { StarIconFigma } from 'shared/ui/star-icon-figma';

interface HospitalReviewRatingStatsV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalReviewRatingStatsV2({
  hospitalId,
  lang,
  dict,
}: HospitalReviewRatingStatsV2Props) {
  const { data: reviewStats, isLoading } = useHospitalReviewStats(hospitalId);

  if (isLoading || !reviewStats) {
    return (
      <div className='border-b border-neutral-200 px-5 py-5'>
        <div className='flex items-stretch gap-3 rounded-xl bg-neutral-100 px-4 py-5'>
          <div className='flex w-[100px] flex-col items-center justify-center gap-2'>
            <div className='h-10 w-16 animate-pulse rounded bg-neutral-200' />
            <div className='flex gap-0.5'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='h-4 w-4 animate-pulse rounded bg-neutral-200' />
              ))}
            </div>
          </div>

          {/* 세로 구분선 */}
          <div className='w-[1px] shrink-0 bg-neutral-200' />

          <div className='flex flex-1 flex-col gap-2'>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className='flex items-center gap-2'>
                <div className='h-5 w-4 animate-pulse rounded bg-neutral-200' />
                <div className='h-[5px] flex-1 animate-pulse rounded-full bg-neutral-200' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { averageRating, ratingDistribution } = reviewStats;

  // 최대값 찾기 (게이지 바 비율 계산용)
  const maxCount = Math.max(
    ratingDistribution[1],
    ratingDistribution[2],
    ratingDistribution[3],
    ratingDistribution[4],
    ratingDistribution[5],
  );

  // 별 아이콘 렌더링 (평균 평점에 따라)
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const decimalPart = averageRating - fullStars;

    // 가득 찬 별
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIconFigma key={`full-${i}`} size={16} color='#FFC31D' className='shrink-0' />,
      );
    }

    // 부분 채워진 별 (소수점이 있을 때)
    if (decimalPart > 0 && fullStars < 5) {
      stars.push(
        <div key='partial' className='relative shrink-0'>
          <StarIconFigma size={16} color='#E5E5E5' className='shrink-0' />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{ width: `${decimalPart * 100}%` }}
          >
            <StarIconFigma size={16} color='#FFC31D' className='shrink-0' />
          </div>
        </div>,
      );
    }

    // 빈 별
    const emptyStars = 5 - Math.ceil(averageRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIconFigma key={`empty-${i}`} size={16} color='#E5E5E5' className='shrink-0' />,
      );
    }

    return stars;
  };

  // 게이지 바 너비 계산
  const getGaugeWidth = (count: number): number => {
    if (maxCount === 0) return 0;
    return (count / maxCount) * 100;
  };

  return (
    <div className='border-b border-neutral-200 px-5 py-5'>
      <div className='flex items-stretch gap-3 rounded-xl bg-neutral-100 p-5'>
        {/* 왼쪽: 평균 평점 및 별 아이콘 */}
        <div className='flex w-[100px] flex-col items-center justify-center gap-2'>
          <p className='text-center text-[36px] leading-[40px] font-bold text-neutral-700'>
            {averageRating.toFixed(1)}
          </p>
          <div className='flex items-center justify-center gap-0.5'>{renderStars()}</div>
        </div>

        {/* 세로 구분선 */}
        <div className='w-[1px] shrink-0 bg-neutral-200' />

        {/* 오른쪽: 1~5점대별 게이지 바 */}
        <div className='flex flex-1 flex-col px-3'>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating as keyof typeof ratingDistribution];
            const width = getGaugeWidth(count);
            const isMax = count === maxCount && count > 0;

            return (
              <div key={rating} className='flex items-center gap-2'>
                <p
                  className={`shrink-0 text-sm leading-5 ${
                    isMax ? 'font-semibold text-[#f15bff]' : 'font-normal text-neutral-500'
                  }`}
                  style={{ width: '9px' }}
                >
                  {rating}
                </p>
                <div className='relative h-[5px] flex-1 overflow-hidden rounded-full bg-neutral-200'>
                  {width > 0 && (
                    <div
                      className='absolute top-0 left-0 h-[5px] rounded-full bg-[#f15bff]'
                      style={{ width: `${width}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

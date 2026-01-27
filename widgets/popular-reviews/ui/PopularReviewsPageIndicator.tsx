'use client';

interface PopularReviewsPageIndicatorProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

export function PopularReviewsPageIndicator({
  totalPages,
  currentPage,
  className = '',
}: PopularReviewsPageIndicatorProps) {
  if (totalPages <= 1) {
    return null;
  }

  // 전체 진행률 계산 (0-100%)
  const progressPercentage = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className={`flex justify-center ${className}`}>
      <div className='relative w-full'>
        {/* 배경 바 */}
        <div className='h-[3px] overflow-hidden rounded-full bg-[#FCE4FF]'>
          {/* 진행 바 */}
          <div
            className='h-full rounded-full bg-primary-900 transition-all duration-300 ease-in-out'
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

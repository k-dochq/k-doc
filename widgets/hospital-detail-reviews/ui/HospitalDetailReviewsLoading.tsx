import { PopularReviewsSkeleton } from 'widgets/popular-reviews/ui/PopularReviewsSkeleton';

/**
 * 병원 리뷰 후기 섹션 로딩 상태 컴포넌트
 */
export function HospitalDetailReviewsLoading() {
  return (
    <div className=''>
      {/* 섹션 헤더 스켈레톤 */}
      <div className='flex items-center justify-between px-5'>
        <div className='flex items-center gap-1'>
          <div className='h-6 w-20 animate-pulse rounded bg-white/50'></div>
        </div>

        <div className='flex items-center gap-0.5'>
          <div className='h-[18px] w-16 animate-pulse rounded bg-white/50'></div>
          <div className='h-4 w-4 animate-pulse rounded bg-white/50'></div>
        </div>
      </div>

      {/* 로딩 상태 - PopularReviewsSkeleton 재활용 */}
      <div className='mt-4'>
        <PopularReviewsSkeleton />
      </div>
    </div>
  );
}

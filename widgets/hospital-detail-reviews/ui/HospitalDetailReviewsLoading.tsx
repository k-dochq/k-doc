import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';
import { PopularReviewsSkeleton } from 'widgets/popular-reviews/ui/PopularReviewsSkeleton';

/**
 * 병원 리뷰 후기 섹션 로딩 상태 컴포넌트
 */
export function HospitalDetailReviewsLoading() {
  return (
    <div className=''>
      {/* 섹션 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <h2 className='text-base leading-6 font-bold text-white'>시술후기</h2>
          <span className='text-sm leading-[18px] font-semibold text-white'>(0)</span>
        </div>

        <button className='flex items-center gap-0.5'>
          <span className='text-sm leading-[18px] font-medium text-white'>전체보기</span>
          <div className='flex items-center justify-center'>
            <ArrowRightIcon className='text-white' />
          </div>
        </button>
      </div>

      {/* 로딩 상태 - PopularReviewsSkeleton 재활용 */}
      <div className='mt-4'>
        <PopularReviewsSkeleton />
      </div>
    </div>
  );
}

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';
import { PopularReviewsError } from 'widgets/popular-reviews/ui/PopularReviewsError';

interface HospitalDetailReviewsErrorProps {
  lang: Locale;
  dict: Dictionary;
  onRetry: () => void;
}

/**
 * 병원 리뷰 후기 섹션 에러 상태 컴포넌트
 */
export function HospitalDetailReviewsError({
  lang,
  dict,
  onRetry,
}: HospitalDetailReviewsErrorProps) {
  return (
    <div className=''>
      {/* 섹션 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <h2 className='text-base leading-6 font-bold text-white'>시술후기</h2>
          <span className='text-sm leading-[18px] font-semibold text-white'>(0)</span>
        </div>

        <button className='flex items-center gap-0.5'>
          <span className='text-sm leading-[18px] font-medium text-white'>
            {dict.hospitalDetailReviews?.viewAll || '전체보기'}
          </span>
          <div className='flex items-center justify-center'>
            <ArrowRightIcon className='text-white' />
          </div>
        </button>
      </div>

      {/* 에러 상태 - PopularReviewsError 재활용 */}
      <div className='mt-4'>
        <PopularReviewsError lang={lang} dict={dict} onRetry={onRetry} />
      </div>
    </div>
  );
}

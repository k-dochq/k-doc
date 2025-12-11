import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption } from 'shared/model/types/review-query';
import { ReviewFilterBarV2 } from './ReviewFilterBarV2';

interface HospitalReviewsHeaderV2Props {
  lang: Locale;
  dict: Dictionary;
  currentSort: ReviewSortOption;
  hospitalId: string;
  reviewCount?: number;
}

export function HospitalReviewsHeaderV2({
  lang,
  dict,
  currentSort,
  hospitalId,
  reviewCount = 0,
}: HospitalReviewsHeaderV2Props) {
  return (
    <div className='flex items-center justify-between px-5 pt-5 pb-0'>
      {/* 타이틀 */}
      <div className='flex items-center gap-1'>
        <p className='text-lg leading-7 font-semibold text-neutral-700'>
          {dict.hospitalReviews?.title || '시술후기'}
        </p>
        <p className='text-lg leading-7 font-semibold text-[#f15bff]'>{reviewCount}</p>
      </div>

      {/* 필터 바 */}
      <ReviewFilterBarV2
        lang={lang}
        dict={dict}
        currentSort={currentSort}
        hospitalId={hospitalId}
      />
    </div>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { LocaleLink } from 'shared/ui/locale-link';

interface ReviewFilterBarProps {
  lang: Locale;
}

export function ReviewFilterBar({ lang }: ReviewFilterBarProps) {
  const searchParams = useSearchParams();

  // 현재 쿼리 파라미터를 유지하면서 정렬 옵션만 변경하는 헬퍼 함수
  const createSortUrl = (sort: ReviewSortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort); // 병원과 동일하게 sort 파라미터 사용
    return `/reviews?${params.toString()}`;
  };

  // 타입 안전하게 현재 정렬 옵션 가져오기
  const currentSort: ReviewSortOption =
    searchParams.get('sort') === REVIEW_SORT_OPTIONS.LATEST ||
    searchParams.get('sort') === REVIEW_SORT_OPTIONS.POPULAR
      ? (searchParams.get('sort') as ReviewSortOption)
      : REVIEW_SORT_OPTIONS.LATEST;

  return (
    <div className='flex items-center justify-between border-t border-b border-neutral-200 px-5 py-3'>
      <div className='flex items-center gap-2'>
        <LocaleLink
          href={createSortUrl(REVIEW_SORT_OPTIONS.LATEST)}
          replace
          className={`text-[13px] font-semibold ${currentSort === REVIEW_SORT_OPTIONS.LATEST ? 'text-primary' : 'text-neutral-500'}`}
        >
          최신순
        </LocaleLink>
        <div className='h-3 w-0 border-l border-neutral-300'></div>
        <LocaleLink
          href={createSortUrl(REVIEW_SORT_OPTIONS.POPULAR)}
          replace
          className={`text-[13px] font-medium ${currentSort === REVIEW_SORT_OPTIONS.POPULAR ? 'text-primary' : 'text-neutral-500'}`}
        >
          인기순
        </LocaleLink>
      </div>
    </div>
  );
}

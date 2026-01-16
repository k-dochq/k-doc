'use client';

import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { FilterIconV2 } from 'shared/ui/icons';
import { openDrawer } from 'shared/lib/drawer';
import { useLocalizedRouter } from 'shared/model/hooks';
import { ReviewSortFilterDrawer } from 'features/hospital-reviews/ui/ReviewSortFilterDrawer';

interface ReviewFilterBarV2Props {
  lang: Locale;
  dict: Dictionary;
  currentSort: ReviewSortOption;
}

export function ReviewFilterBarV2({ lang, dict, currentSort }: ReviewFilterBarV2Props) {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();

  // 현재 정렬 상태에 따른 버튼 텍스트
  const getSortLabel = (): string => {
    switch (currentSort) {
      case REVIEW_SORT_OPTIONS.POPULAR:
        return dict.allReviews?.sort?.popular ?? '';
      case REVIEW_SORT_OPTIONS.RECOMMENDED:
        return dict.allReviews?.sort?.recommended ?? '';
      case REVIEW_SORT_OPTIONS.RATING_HIGH:
        return dict.allReviews?.sort?.ratingHigh ?? '';
      case REVIEW_SORT_OPTIONS.RATING_LOW:
        return dict.allReviews?.sort?.ratingLow ?? '';
      default:
        return dict.allReviews?.sort?.popular ?? '';
    }
  };

  const sortLabel = getSortLabel();

  const handleSortClick = async () => {
    await openDrawer({
      content: (
        <ReviewSortFilterDrawer
          lang={lang}
          dict={dict}
          currentSort={currentSort}
          onSelect={(sort) => {
            // URL 업데이트 (기존 파라미터 유지)
            const params = new URLSearchParams(searchParams?.toString() || '');
            params.set('sort', sort);
            router.replace(`/v2/reviews?${params.toString()}`);
          }}
        />
      ),
    });
  };

  return (
    <div className='w-full'>
      {/* 상단 margin area */}
      <div className='h-[6px] w-full bg-neutral-100' />

      {/* 필터 영역 */}
      <div className='flex items-center justify-between px-5 py-3'>
        {/* 정렬 버튼 */}
        <button
          onClick={handleSortClick}
          className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'
        >
          <FilterIconV2 className='h-[18px] w-[18px] shrink-0' />
          <p className='text-sm leading-5 font-semibold text-neutral-700'>{sortLabel}</p>
        </button>
      </div>
    </div>
  );
}

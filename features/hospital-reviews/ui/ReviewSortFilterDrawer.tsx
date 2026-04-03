'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { CheckIcon } from 'shared/ui/icons';
import { resolveDrawer } from 'shared/lib/drawer';

/** 정렬 드로어 기본 노출 순서 (전체 옵션). 호출부에서 `sortOptions`로 덮어쓸 수 있음. */
export const DEFAULT_REVIEW_SORT_FILTER_OPTIONS = [
  REVIEW_SORT_OPTIONS.POPULAR,
  REVIEW_SORT_OPTIONS.RECOMMENDED,
  REVIEW_SORT_OPTIONS.RATING_HIGH,
  REVIEW_SORT_OPTIONS.RATING_LOW,
] as const satisfies readonly ReviewSortOption[];

interface ReviewSortFilterDrawerProps {
  lang: Locale;
  dict: Dictionary;
  currentSort: ReviewSortOption;
  onSelect: (sort: ReviewSortOption) => void;
  /** 드로어에 나열할 정렬 키. 미지정 시 `DEFAULT_REVIEW_SORT_FILTER_OPTIONS`와 동일 */
  sortOptions?: readonly ReviewSortOption[];
}

function labelForSort(dict: Dictionary, value: ReviewSortOption): string {
  switch (value) {
    case REVIEW_SORT_OPTIONS.POPULAR:
      return dict.allReviews?.sort?.popular ?? '';
    case REVIEW_SORT_OPTIONS.RECOMMENDED:
      return dict.allReviews?.sort?.recommended ?? '';
    case REVIEW_SORT_OPTIONS.LATEST:
      return dict.allReviews?.sort?.latest ?? '';
    case REVIEW_SORT_OPTIONS.RATING_HIGH:
      return dict.allReviews?.sort?.ratingHigh ?? '';
    case REVIEW_SORT_OPTIONS.RATING_LOW:
      return dict.allReviews?.sort?.ratingLow ?? '';
    default:
      return '';
  }
}

export function ReviewSortFilterDrawer({
  lang: _lang,
  dict,
  currentSort,
  onSelect,
  sortOptions = DEFAULT_REVIEW_SORT_FILTER_OPTIONS,
}: ReviewSortFilterDrawerProps) {
  const rows: Array<{ value: ReviewSortOption; label: string }> = sortOptions.map((value) => ({
    value,
    label: labelForSort(dict, value),
  }));

  const handleSelect = (sort: ReviewSortOption) => {
    onSelect(sort);
    resolveDrawer();
  };

  const handleCancel = () => {
    resolveDrawer();
  };

  return (
    <div className='w-full bg-white px-5 pt-0 pb-10'>
      {rows.map((option, index) => {
        const isSelected = currentSort === option.value;
        const isLast = index === rows.length - 1;

        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`relative flex h-14 w-full items-center justify-center border-t-0 border-r-0 border-b border-l-0 border-solid border-neutral-200 ${
              isLast ? '' : ''
            }`}
          >
            <p className='text-base leading-6 font-medium text-neutral-700'>{option.label}</p>
            {isSelected && (
              <div className='absolute right-0 flex h-6 w-6 shrink-0 items-center justify-center'>
                <CheckIcon className='h-6 w-6' />
              </div>
            )}
          </button>
        );
      })}

      {/* 취소 버튼 */}
      <button onClick={handleCancel} className='flex h-14 w-full items-center justify-center px-5'>
        <p className='text-base leading-6 font-medium text-neutral-400'>{dict.common.cancel}</p>
      </button>
    </div>
  );
}

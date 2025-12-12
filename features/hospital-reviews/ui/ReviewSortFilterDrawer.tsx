'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { CheckIcon } from 'shared/ui/icons';
import { resolveDrawer } from 'shared/lib/drawer';

interface ReviewSortFilterDrawerProps {
  lang: Locale;
  dict: Dictionary;
  currentSort: ReviewSortOption;
  onSelect: (sort: ReviewSortOption) => void;
}

export function ReviewSortFilterDrawer({
  lang,
  dict,
  currentSort,
  onSelect,
}: ReviewSortFilterDrawerProps) {
  const sortOptions: Array<{ value: ReviewSortOption; label: string }> = [
    {
      value: REVIEW_SORT_OPTIONS.POPULAR,
      label: dict.allReviews?.sort?.popular ?? '',
    },
    {
      value: REVIEW_SORT_OPTIONS.LATEST,
      label: dict.allReviews?.sort?.latest ?? '',
    },
    {
      value: REVIEW_SORT_OPTIONS.RATING_HIGH,
      label: dict.allReviews?.sort?.ratingHigh ?? '',
    },
    {
      value: REVIEW_SORT_OPTIONS.RATING_LOW,
      label: dict.allReviews?.sort?.ratingLow ?? '',
    },
  ];

  const handleSelect = (sort: ReviewSortOption) => {
    onSelect(sort);
    resolveDrawer();
  };

  const handleCancel = () => {
    resolveDrawer();
  };

  return (
    <div className='w-full bg-white px-5 pt-0 pb-10'>
      {sortOptions.map((option, index) => {
        const isSelected = currentSort === option.value;
        const isLast = index === sortOptions.length - 1;

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

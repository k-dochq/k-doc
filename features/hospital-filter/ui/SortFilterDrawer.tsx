'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { CheckIcon } from 'shared/ui/icons';
import { resolveDrawer } from 'shared/lib/drawer';

interface SortFilterDrawerProps {
  lang: Locale;
  dict: Dictionary;
  currentSort: HospitalSortOption;
  onSelect: (sort: HospitalSortOption) => void;
}

export function SortFilterDrawer({ lang, dict, currentSort, onSelect }: SortFilterDrawerProps) {
  const sortOptions: Array<{ value: HospitalSortOption; label: string }> = [
    {
      value: HOSPITAL_SORT_OPTIONS.POPULAR,
      label: dict.hospitalSort.popular,
    },
    {
      value: HOSPITAL_SORT_OPTIONS.RECOMMENDED,
      label: dict.hospitalSort.recommended,
    },
    {
      value: HOSPITAL_SORT_OPTIONS.NEWEST,
      label: dict.hospitalSort.newest,
    },
  ];

  const handleSelect = (sort: HospitalSortOption) => {
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

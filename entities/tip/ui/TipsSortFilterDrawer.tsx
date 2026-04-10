'use client';

import { type Dictionary } from 'shared/model/types';
import { CheckIcon } from 'shared/ui/icons';
import { resolveDrawer } from 'shared/lib/drawer';
import { type TipsSortOption } from '../model/useInfiniteTips';

interface TipsSortFilterDrawerProps {
  dict: Dictionary;
  currentSort: TipsSortOption;
  onSelect: (sort: TipsSortOption) => void;
}

const OPTIONS: TipsSortOption[] = ['latest', 'popular'];

export function TipsSortFilterDrawer({
  dict,
  currentSort,
  onSelect,
}: TipsSortFilterDrawerProps) {
  const handleSelect = (sort: TipsSortOption) => {
    onSelect(sort);
    resolveDrawer();
  };

  const handleCancel = () => {
    resolveDrawer();
  };

  return (
    <div className='w-full bg-white px-5 pt-0 pb-10'>
      {OPTIONS.map((option) => {
        const isSelected = currentSort === option;
        const label = dict.tips?.sort?.[option] ?? option;
        return (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className='relative flex h-14 w-full items-center justify-center border-t-0 border-r-0 border-b border-l-0 border-solid border-neutral-200'
          >
            <p className='text-base leading-6 font-medium text-neutral-700'>{label}</p>
            {isSelected && (
              <div className='absolute right-0 flex h-6 w-6 shrink-0 items-center justify-center'>
                <CheckIcon className='h-6 w-6' />
              </div>
            )}
          </button>
        );
      })}

      <button onClick={handleCancel} className='flex h-14 w-full items-center justify-center px-5'>
        <p className='text-base leading-6 font-medium text-neutral-400'>
          {dict.common?.cancel ?? 'Cancel'}
        </p>
      </button>
    </div>
  );
}

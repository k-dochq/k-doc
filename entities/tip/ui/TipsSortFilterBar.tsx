'use client';

import { type Dictionary } from 'shared/model/types';
import { FilterIconV2 } from 'shared/ui/icons';
import { openDrawer } from 'shared/lib/drawer';
import { type TipsSortOption } from '../model/useInfiniteTips';
import { TipsSortFilterDrawer } from './TipsSortFilterDrawer';

interface TipsSortFilterBarProps {
  dict: Dictionary;
  currentSort: TipsSortOption;
  onSortChange: (sort: TipsSortOption) => void;
}

export function TipsSortFilterBar({
  dict,
  currentSort,
  onSortChange,
}: TipsSortFilterBarProps) {
  const sortLabel = dict.tips?.sort?.[currentSort] ?? currentSort;

  const handleSortClick = async () => {
    await openDrawer({
      content: (
        <TipsSortFilterDrawer
          dict={dict}
          currentSort={currentSort}
          onSelect={onSortChange}
        />
      ),
    });
  };

  return (
    <div className='flex items-center justify-end pt-4'>
      <button
        onClick={handleSortClick}
        className='flex items-center justify-center gap-0.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5'
      >
        <FilterIconV2 className='h-[18px] w-[18px] shrink-0' />
        <p className='text-sm leading-5 font-semibold text-neutral-700'>{sortLabel}</p>
      </button>
    </div>
  );
}

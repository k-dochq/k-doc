'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface SortFilterProps {
  sortBy: 'latest' | 'popular';
  onSortChange: (sortBy: 'latest' | 'popular') => void;
  lang: Locale;
  dict: Dictionary;
}

export function SortFilter({ sortBy, onSortChange, lang, dict }: SortFilterProps) {
  const sortOptions: Array<{ value: 'latest' | 'popular'; label: string }> = [
    {
      value: 'latest',
      label: dict.allReviews?.sort?.latest || '최신순',
    },
    {
      value: 'popular',
      label: dict.allReviews?.sort?.popular || '인기순',
    },
  ];

  return (
    <div className='flex items-center space-x-2'>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            sortBy === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

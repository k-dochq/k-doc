'use client';

import { useState } from 'react';

export type SortOption = 'createdAt' | 'viewCount';

interface HospitalSortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function HospitalSortSelector({ currentSort, onSortChange }: HospitalSortSelectorProps) {
  const sortOptions = [
    { value: 'createdAt' as const, label: '최신순' },
    { value: 'viewCount' as const, label: '인기순' },
  ];

  return (
    <div className='mb-4 flex gap-2'>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            currentSort === option.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

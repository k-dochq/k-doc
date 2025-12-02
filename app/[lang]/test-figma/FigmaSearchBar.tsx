'use client';

import { useState } from 'react';
import { SearchIconFigma } from 'shared/ui/search-icon-figma';

export function FigmaSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 검색 로직은 여기에 추가 가능
      console.log('검색:', searchTerm);
    }
  };

  return (
    <div className='flex w-full items-center gap-1.5 rounded-full border border-neutral-200 bg-[#f1f1f1] px-4 py-3'>
      <div className='relative size-5 shrink-0'>
        <SearchIconFigma size={20} color='#A3A3A3' />
      </div>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='병원, 시술 부위를 검색해보세요.'
        className='flex-1 bg-transparent text-sm leading-5 font-medium text-neutral-400 placeholder-neutral-400 focus:text-neutral-900 focus:outline-none'
      />
    </div>
  );
}

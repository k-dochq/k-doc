'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { SearchIconV2 } from './SearchIconV2';

interface SearchBarV2Props {
  lang: Locale;
  dict: Dictionary;
  initialValue?: string;
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  searchPath?: string; // 기본: /hospitals
}

export function SearchBarV2({
  lang,
  dict,
  initialValue = '',
  placeholder,
  onSearch,
  searchPath = '/hospitals',
}: SearchBarV2Props) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();

  // initialValue가 변경되면 searchTerm 업데이트
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = () => {
    const trimmedSearch = searchTerm.trim();

    // 커스텀 onSearch 핸들러가 있으면 사용
    if (onSearch) {
      onSearch(trimmedSearch);
      return;
    }

    // 기본 동작: 현재 쿼리 파라미터를 유지하면서 search만 변경
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    } else {
      params.delete('search');
    }

    // 페이지는 1로 리셋 (검색 결과가 바뀌므로)
    params.set('page', '1');

    const queryString = params.toString();
    router.push(`${searchPath}${queryString ? `?${queryString}` : ''}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='w-full' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className='flex items-center gap-1.5 rounded-full border border-neutral-200 bg-[#f1f1f1] px-4 py-3'>
        <div className='shrink-0'>
          <SearchIconV2 />
        </div>
        <div className='flex-1'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || dict.search.placeholder}
            className='w-full bg-transparent text-sm font-medium text-gray-900 placeholder-neutral-400 focus:outline-none'
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { SearchIcon } from './SearchIcon';

interface SearchBarProps {
  lang: Locale;
  dict: Dictionary;
  initialValue?: string;
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
}

export function SearchBar({
  lang,
  dict,
  initialValue = '',
  placeholder,
  onSearch,
}: SearchBarProps) {
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
    router.push(`/hospitals${queryString ? `?${queryString}` : ''}`);
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
    <div className='w-full'>
      <div
        className='flex items-center rounded-full p-[2px]'
        style={{
          background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
        }}
      >
        <div className='flex h-full w-full items-center rounded-full bg-white py-2 pr-2 pl-4'>
          <div className='flex-1'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder || dict.search.placeholder}
              className='w-full bg-transparent text-sm text-gray-900 placeholder-neutral-400 focus:outline-none'
            />
          </div>
          <div className='shrink-0'>
            <button
              type='button'
              onClick={handleSearch}
              className='flex items-center justify-center rounded-full'
              aria-label='검색'
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

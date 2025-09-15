'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

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
    const params = new URLSearchParams(searchParams.toString());

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
      <div className='border-primary flex items-center rounded-full border bg-white py-2 pr-2 pl-4'>
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
            className='bg-primary-light flex items-center justify-center rounded-full p-2'
            aria-label='검색'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                d='M17.5 17.5L12.5 12.5M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z'
                stroke='currentColor'
                className='text-primary'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRightIcon } from 'shared/ui/chevron-right-icon';
import { SearchIcon } from 'shared/ui/icons';
import { useRouter } from 'next/navigation';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Dictionary } from 'shared/model/types';

interface SearchGnbV2Props {
  dict: Dictionary;
}

export function SearchGnbV2({ dict }: SearchGnbV2Props) {
  const router = useRouter();
  const localizedRouter = useLocalizedRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(searchParams.get('q') ?? '');

  // URL의 q 파라미터가 바뀌면 input 동기화
  useEffect(() => {
    setValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleSearch = () => {
    const trimmed = value.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set('q', trimmed);
    localizedRouter.push(`/v2/search${params.size ? `?${params.toString()}` : ''}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') inputRef.current?.blur();
  };

  return (
    <div className='sticky top-0 z-50 flex h-[58px] w-full items-center gap-1 bg-white px-5 py-4'>
      <button
        type='button'
        onClick={() => router.back()}
        className='flex shrink-0 items-center justify-center'
      >
        <ChevronRightIcon size={24} color='#404040' className='rotate-180' />
      </button>
      <div className='flex flex-1 items-center gap-[6px] rounded-full border border-[#e5e5e5] bg-[#f1f1f1] px-4 py-2'>
        <input
          ref={inputRef}
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={dict.search?.placeholder}
          className="flex-1 bg-transparent font-['Pretendard'] text-base font-semibold leading-6 text-[#404040] outline-none placeholder:text-[#a3a3a3]"
        />
        {value.length > 0 ? (
          <button
            type='button'
            onClick={() => setValue('')}
            className='flex size-[20px] shrink-0 items-center justify-center rounded-full bg-[#737373]'
          >
            <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
              <path d='M1 1L9 9M9 1L1 9' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
            </svg>
          </button>
        ) : (
          <button type='button' onClick={handleSearch} className='flex shrink-0 items-center'>
            <SearchIcon size={20} color='#F15BFF' />
          </button>
        )}
      </div>
    </div>
  );
}

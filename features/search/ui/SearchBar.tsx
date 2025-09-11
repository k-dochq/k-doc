'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface SearchBarProps {
  lang: Locale;
  dict: Dictionary;
}

export function SearchBar({ lang, dict }: SearchBarProps) {
  return (
    <div className='w-full'>
      <div className='relative flex items-center justify-between rounded-full border border-[#da47ef] bg-white py-2 pr-2 pl-4'>
        <input
          type='text'
          placeholder={dict.search.placeholder}
          className='flex-1 bg-transparent text-sm text-gray-900 placeholder-neutral-400 focus:outline-none'
        />
        <button
          type='button'
          className='flex items-center justify-center rounded-full bg-[#fce4ff] p-2'
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
              stroke='#DA47EF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

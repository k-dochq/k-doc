'use client';

import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';
import { COUNTRY_CODES } from 'entities/country-code';
import { closeDrawer, resolveDrawer } from 'shared/lib/drawer';

function SearchIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M17.5 17.5L12.5 12.5M2.5 8.33333C2.5 9.09938 2.65088 9.85792 2.94404 10.5657C3.23719 11.2734 3.66687 11.9164 4.20854 12.4581C4.75022 12.9998 5.39328 13.4295 6.10101 13.7226C6.80875 14.0158 7.56729 14.1667 8.33333 14.1667C9.09938 14.1667 9.85792 14.0158 10.5657 13.7226C11.2734 13.4295 11.9164 12.9998 12.4581 12.4581C12.9998 11.9164 13.4295 11.2734 13.7226 10.5657C14.0158 9.85792 14.1667 9.09938 14.1667 8.33333C14.1667 7.56729 14.0158 6.80875 13.7226 6.10101C13.4295 5.39328 12.9998 4.75022 12.4581 4.20854C11.9164 3.66687 11.2734 3.23719 10.5657 2.94404C9.85792 2.65088 9.09938 2.5 8.33333 2.5C7.56729 2.5 6.80875 2.65088 6.10101 2.94404C5.39328 3.23719 4.75022 3.66687 4.20854 4.20854C3.66687 4.75022 3.23719 5.39328 2.94404 6.10101C2.65088 6.80875 2.5 7.56729 2.5 8.33333Z'
        stroke='#7657FF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M10 10L5 5M10 10L15 15M10 10L15 5M10 10L5 15'
        stroke='#737373'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

interface KdocNationalityDrawerProps {
  dict: Dictionary;
}

export function KdocNationalityDrawer({ dict }: KdocNationalityDrawerProps) {
  const t = dict.kdocChat.guestForm;
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? COUNTRY_CODES.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
    : COUNTRY_CODES;

  const handleSelect = (name: string) => {
    resolveDrawer<string>(name);
  };

  return (
    <div className='flex h-[75vh] flex-col bg-white px-5'>
      {/* 헤더 */}
      <div className='flex items-center justify-between py-3'>
        <p className='text-lg font-bold text-[#404040]'>{t.nationalityLabel}</p>
        <button
          onClick={closeDrawer}
          className='flex h-5 w-5 items-center justify-center'
          aria-label='닫기'
        >
          <XIcon />
        </button>
      </div>

      {/* 검색 */}
      <div className='flex items-center gap-[6px] rounded-full border border-[#e5e5e5] bg-[#f1f1f1] px-4 py-2'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.nationalitySearchPlaceholder}
          className='flex-1 bg-transparent text-base font-semibold text-[#404040] outline-none placeholder:font-semibold placeholder:text-[#a3a3a3]'
          autoFocus
        />
        <SearchIcon />
      </div>

      {/* 목록 */}
      <div className='mt-0 flex-1 overflow-y-auto'>
        <div className='py-3'>
          <p className='text-sm font-semibold text-[#a3a3a3]'>{t.nationalityAllCountries}</p>
        </div>
        {filtered.map((country) => (
          <button
            key={country.name}
            onClick={() => handleSelect(country.name)}
            className='flex w-full items-center py-2 text-left'
          >
            <span className='flex-1 text-base font-medium text-[#404040]'>{country.name}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className='py-4 text-center text-sm text-[#a3a3a3]'>{query} — 검색 결과 없음</p>
        )}
      </div>
    </div>
  );
}

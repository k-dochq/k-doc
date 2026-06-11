'use client';

import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';
import { COUNTRY_CODES } from 'entities/country-code';
import { closeDrawer, resolveDrawer } from 'shared/lib/drawer';

function SearchIcon() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z'
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
        d='M15 5L5 15M5 5L15 15'
        stroke='#404040'
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
            key={country.code}
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

'use client';

import { useState, useEffect } from 'react';
import { type Dictionary } from 'shared/model/types';

interface CustomDateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  dict?: Dictionary;
}

export function CustomDateInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  dict,
}: CustomDateInputProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // ISO 날짜 형식 (YYYY-MM-DD)을 표시 형식으로 변환
  const formatDateForDisplay = (isoDate: string, locale: string): string => {
    if (!isoDate) return '';

    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';

      // 로케일에 따른 날짜 형식 설정
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };

      return date.toLocaleDateString(locale, options);
    } catch {
      return '';
    }
  };

  // 표시 형식을 ISO 날짜 형식으로 변환
  const parseDisplayToISO = (displayDate: string, locale: string): string => {
    if (!displayDate) return '';

    try {
      // 다양한 날짜 형식 시도
      const formats = [
        // MM/DD/YYYY (미국)
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        // DD/MM/YYYY (유럽)
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        // YYYY-MM-DD (ISO)
        /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
        // YYYY.MM.DD (한국)
        /^(\d{4})\.(\d{1,2})\.(\d{1,2})$/,
      ];

      for (const format of formats) {
        const match = displayDate.match(format);
        if (match) {
          const [, part1, part2, part3] = match;

          // 로케일에 따라 월/일 순서 결정
          let year, month, day;
          if (locale === 'ko') {
            // 한국: YYYY.MM.DD
            year = part1;
            month = part2.padStart(2, '0');
            day = part3.padStart(2, '0');
          } else if (locale === 'en' || locale === 'en-US') {
            // 미국: MM/DD/YYYY
            year = part3;
            month = part1.padStart(2, '0');
            day = part2.padStart(2, '0');
          } else {
            // 기본: YYYY-MM-DD
            year = part1;
            month = part2.padStart(2, '0');
            day = part3.padStart(2, '0');
          }

          const isoDate = `${year}-${month}-${day}`;
          const date = new Date(isoDate);

          if (!isNaN(date.getTime())) {
            return isoDate;
          }
        }
      }

      return '';
    } catch {
      return '';
    }
  };

  // 로케일 결정
  const getLocale = (): string => {
    if (dict?.auth?.signup?.dateFormat?.includes('Year')) return 'en-US';
    if (dict?.auth?.signup?.dateFormat?.includes('ปี')) return 'th-TH';
    // tl locale은 영어 형식 사용
    return 'ko-KR';
  };

  // 값이 변경될 때 표시 값 업데이트
  useEffect(() => {
    if (value) {
      const locale = getLocale();
      const formatted = formatDateForDisplay(value, locale);
      setDisplayValue(formatted);
    } else {
      setDisplayValue('');
    }
  }, [value, dict]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    if (inputValue) {
      const locale = getLocale();
      const isoDate = parseDisplayToISO(inputValue, locale);
      if (isoDate) {
        onChange(isoDate);
      }
    } else {
      onChange('');
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);

    // 포커스가 해제될 때 유효한 날짜로 포맷팅
    if (displayValue) {
      const locale = getLocale();
      const isoDate = parseDisplayToISO(displayValue, locale);
      if (isoDate) {
        const formatted = formatDateForDisplay(isoDate, locale);
        setDisplayValue(formatted);
        onChange(isoDate);
      }
    }
  };

  const getPlaceholderText = (): string => {
    if (isFocused) return '';

    const locale = getLocale();
    if (locale === 'en-US') return 'MM/DD/YYYY';
    if (locale === 'th-TH') return 'DD/MM/YYYY';
    // tl locale은 영어 형식 사용
    return 'YYYY.MM.DD';
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>
        <span>
          <span className='text-neutral-500'>[{dict?.auth?.signup?.optional || '선택'}]</span>{' '}
          {label}
        </span>
      </label>
      <div className='relative'>
        <input
          type='text'
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={getPlaceholderText()}
          disabled={disabled}
          className='w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 pr-10 text-sm text-neutral-900 focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
        {/* 달력 아이콘 */}
        <div className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 8.33333H17.5M2.5 6.66667C2.5 5.19391 3.69391 4 5.16667 4H14.8333C16.3061 4 17.5 5.19391 17.5 6.66667V15C17.5 16.4728 16.3061 17.6667 14.8333 17.6667H5.16667C3.69391 17.6667 2.5 16.4728 2.5 15V6.66667Z'
              stroke='#A3A3A3'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { Calendar } from './calendar';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  locale: Locale;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
}

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

export function DatePicker({
  value,
  onChange,
  locale,
  placeholder = '날짜를 선택해주세요',
  disabled,
  className = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 달력 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (locale === 'ko') {
      return `${year}년 ${month}월 ${day}일`;
    } else if (locale === 'th') {
      return `${day}/${month}/${year}`; // 태국어도 서기 연도 사용
    } else {
      return `${month}/${day}/${year}`;
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between rounded-xl border border-neutral-300 bg-white px-4 py-4 text-left text-sm leading-5 focus:border-transparent focus:ring-2 focus:ring-[#da47ef] focus:outline-none'
      >
        <span className={value ? 'text-neutral-900' : 'text-neutral-400'}>
          {value ? formatDate(value) : placeholder}
        </span>
        <CalendarIcon className='h-5 w-5 text-neutral-400' />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 z-50 mt-1'>
          <Calendar
            selected={value}
            onSelect={handleDateSelect}
            locale={locale}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import * as React from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Calendar } from './calendar';
import { cn } from '../lib/utils';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  locale: Locale;
  dict?: Dictionary;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
  required?: boolean;
  label?: string;
  error?: string;
  yearRange?: { from: number; to: number };
}

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='#A3A3A3' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
  </svg>
);

export function DatePicker({
  value,
  onChange,
  locale,
  dict,
  placeholder,
  disabled,
  className = '',
  required = false,
  label,
  error,
  yearRange,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 외부 클릭 시 달력 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (locale === 'ko') {
      return `${year}년 ${month}월 ${day}일`;
    } else if (locale === 'th') {
      return `${day}/${month}/${year}`;
    } else {
      return `${month}/${day}/${year}`;
    }
  };

  const getPlaceholderText = (): string => {
    if (placeholder) return placeholder;

    if (locale === 'ko') return '날짜를 선택해주세요';
    if (locale === 'th') return 'เลือกวันที่';
    return 'Select date';
  };

  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date);
    setOpen(false);
  };

  const handleButtonClick = () => {
    console.log('Date picker button clicked, setting open to:', !open);
    setOpen(!open);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className='flex w-full flex-col gap-2'>
        {label && (
          <label className='text-sm leading-5 font-medium text-neutral-900'>
            <span>
              {required && (
                <span style={{ color: '#AE33FB' }}>[{dict?.auth?.signup?.required || '필수'}]</span>
              )}
              {!required && (
                <span className='text-neutral-500'>[{dict?.auth?.signup?.optional || '선택'}]</span>
              )}{' '}
              {label}
            </span>
          </label>
        )}

        <button
          type='button'
          onClick={handleButtonClick}
          className={cn(
            `flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-normal focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
              value ? 'border-transparent' : 'border-neutral-300'
            }`,
            error && 'border-red-300',
          )}
          style={{
            backgroundColor: 'white',
            backgroundImage: value 
              ? 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)'
              : 'white',
            backgroundOrigin: value ? 'border-box' : undefined,
            backgroundClip: value 
              ? 'padding-box, border-box'
              : undefined,
            backgroundSize: value 
              ? '100% 100%, 100% 100%'
              : undefined,
          }}
          onFocus={(e) => {
            if (!value) {
              e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)';
              e.target.style.backgroundOrigin = 'border-box';
              e.target.style.backgroundClip = 'padding-box, border-box';
              e.target.style.backgroundSize = '100% 100%, 100% 100%';
              e.target.style.borderColor = 'transparent';
            }
          }}
          onBlur={(e) => {
            if (!value) {
              e.target.style.backgroundImage = 'white';
              e.target.style.backgroundOrigin = 'initial';
              e.target.style.backgroundClip = 'initial';
              e.target.style.backgroundSize = 'initial';
              e.target.style.borderColor = '';
            }
          }}
        >
          <span className={value ? 'text-neutral-900' : 'text-neutral-500'}>
            {value ? formatDate(value) : getPlaceholderText()}
          </span>
          <div className='flex items-center gap-2'>
            <CalendarIcon className='h-5 w-5 text-neutral-400' />
            <ChevronDownIcon className='h-5 w-5 text-neutral-400' />
          </div>
        </button>

        {open && (
          <div className='absolute top-full left-0 z-50 mt-1'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={handleDateSelect}
              locale={locale}
              disabled={disabled}
              captionLayout='dropdown'
              yearRange={yearRange}
            />
          </div>
        )}

        {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Calendar } from 'shared/ui/calendar';

interface FormDatePickerV2Props {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  locale: Locale;
  dict?: Dictionary;
  placeholder?: string;
  error?: string;
  disabled?: (date: Date) => boolean;
  required?: boolean;
  yearRange?: { from: number; to: number };
}

const baseInputClasses =
  'block w-full rounded-xl border px-4 py-3.5 text-sm leading-6 transition focus:outline-none';
const normalState =
  'border-neutral-200 bg-white text-neutral-900 focus:border-[#A854E2] focus:ring-2 focus:ring-[#A854E2]/40';
const errorState =
  'border-[#EF4444] bg-white text-neutral-900 focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/30';

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

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
  </svg>
);

function FieldLabel({
  label,
  required,
  optionalText,
}: {
  label: string;
  required?: boolean;
  optionalText?: string;
}) {
  return (
    <label className='text-sm leading-5 font-medium text-neutral-900'>
      {required ? (
        <span className='text-[#DA47EF]'>*</span>
      ) : optionalText ? (
        <span className='text-neutral-500'>[{optionalText}]</span>
      ) : null}{' '}
      {label}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className='text-sm leading-5 text-[#EF4444]'>{message}</p>;
}

export function FormDatePickerV2({
  label,
  value,
  onChange,
  locale,
  dict,
  placeholder,
  error,
  disabled,
  required = true,
  yearRange,
}: FormDatePickerV2Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const disablePastDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || (disabled ? disabled(date) : false);
  };

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const resolvedYearRange = yearRange ?? { from: currentYear, to: currentYear + 5 };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (locale === 'ko') return `${year}년 ${month}월 ${day}일`;
    if (locale === 'th') return `${day}/${month}/${year}`;
    return `${month}/${day}/${year}`;
  };

  const getPlaceholderText = (): string => {
    if (placeholder) return placeholder;
    if (locale === 'ko') return '날짜를 선택해주세요';
    if (locale === 'th') return 'เลือกวันที่';
    return 'Select date';
  };

  const triggerClasses = `${baseInputClasses} flex items-center justify-between ${
    error ? errorState : normalState
  }`;

  const optionalText = dict?.auth?.signup?.optional || '선택';

  return (
    <div ref={containerRef} className='relative'>
      <div className='flex w-full flex-col gap-2'>
        <FieldLabel
          label={label}
          required={required}
          optionalText={!required ? optionalText : undefined}
        />

        <button type='button' onClick={() => setOpen((prev) => !prev)} className={triggerClasses}>
          <span className={value ? 'text-neutral-900' : 'text-neutral-400'}>
            {value ? formatDate(value) : getPlaceholderText()}
          </span>
          <span className='flex items-center gap-2 text-neutral-400'>
            <CalendarIcon className='h-4 w-4' />
            <ChevronDownIcon className='h-4 w-4' />
          </span>
        </button>

        {open && (
          <div className='absolute top-full left-0 z-50 mt-1'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              locale={locale}
              disabled={disablePastDates}
              captionLayout='dropdown'
              yearRange={resolvedYearRange}
            />
          </div>
        )}

        <FieldError message={error} />
      </div>
    </div>
  );
}

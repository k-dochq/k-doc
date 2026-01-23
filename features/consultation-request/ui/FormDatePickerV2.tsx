'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { Calendar } from 'shared/ui/calendar';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import { baseInputClasses, buildStateClass } from './form-field-styles';
import { CalendarIcon } from './CalendarIcon';

interface FormDatePickerV2Props {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  locale: Locale;
  dict?: Dictionary;
  placeholder?: string;
  error?: string;
  /**
   * 특정 날짜를 비활성화할지 여부를 결정하는 콜백.
   * 넘기지 않으면 모든 날짜 선택 가능.
   */
  disabled?: (date: Date) => boolean;
  required?: boolean;
  yearRange?: { from: number; to: number };
  hideOptionalText?: boolean;
  helperText?: string;
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
  hideOptionalText,
  helperText,
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

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const resolvedYearRange = yearRange ?? { from: currentYear, to: currentYear + 5 };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (locale === 'ko') return `${year}년 ${month}월 ${day}일`;
    if (locale === 'th') return `${day}/${month}/${year}`;
    if (locale === 'tl') return `${month}/${day}/${year}`;
    return `${month}/${day}/${year}`;
  };

  const getPlaceholderText = (): string => {
    if (placeholder) return placeholder;
    if (locale === 'ko') return '날짜를 선택해주세요';
    if (locale === 'th') return 'เลือกวันที่';
    if (locale === 'tl') return 'Pumili ng petsa';
    return 'Select date';
  };

  const optionalText = '';
  const stateClass = buildStateClass(value, error);
  const triggerClasses = `${baseInputClasses} h-[52px] p-4 flex items-center justify-between bg-white ${stateClass}`;

  return (
    <div ref={containerRef} className='relative'>
      <div className='flex w-full flex-col gap-2'>
        <FieldLabel
          label={label}
          required={required}
          optionalText={!required && !hideOptionalText ? optionalText : undefined}
        />

        <button type='button' onClick={() => setOpen((prev) => !prev)} className={triggerClasses}>
          <span className={value ? 'text-neutral-900' : 'text-neutral-400'}>
            {value ? formatDate(value) : getPlaceholderText()}
          </span>
          <span className='flex items-center text-neutral-400'>
            <CalendarIcon className='h-5 w-5' />
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
              disabled={disabled}
              captionLayout='dropdown'
              yearRange={resolvedYearRange}
            />
          </div>
        )}

        <FieldError message={error} />
        {helperText ? <p className='text-xs text-neutral-500'>{helperText}</p> : null}
      </div>
    </div>
  );
}

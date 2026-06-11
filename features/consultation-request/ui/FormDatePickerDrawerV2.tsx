'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { openDrawer } from 'shared/lib/drawer';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import { baseInputClasses, buildStateClass } from './form-field-styles';
import { CalendarIcon } from './CalendarIcon';
import { DatePickerDrawerContentV2 } from './DatePickerDrawerContentV2';

interface FormDatePickerDrawerV2Props {
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
  hideOptionalText?: boolean;
  /** required=false일 때 라벨 옆 괄호 표시 (예: dict.auth.signup.optional) */
  optionalBracketsText?: string;
  helperText?: string;
  openingHours?: OpeningHours;
}

const DEFAULT_PLACEHOLDER_BY_LOCALE: Record<Locale, string> = {
  ko: '날짜를 선택해주세요',
  en: 'Select date',
  th: 'เลือกวันที่',
  'zh-Hant': '選擇日期',
  ja: '日付を選択',
  hi: 'तारीख़ चुनें',
  tl: 'Pumili ng petsa',
  ar: 'اختر التاريخ',
  ru: 'Выберите дату',
};

const LOCALE_TO_BCP47: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  th: 'th-TH',
  'zh-Hant': 'zh-Hant-TW',
  ja: 'ja-JP',
  hi: 'hi-IN',
  tl: 'fil-PH',
  ar: 'ar-SA',
  ru: 'ru-RU',
};

const formatDisplayDate = (date: Date, locale: Locale): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const h = date.getHours();
  const m = date.getMinutes();
  if (h !== 0 || m !== 0) {
    const weekday = new Intl.DateTimeFormat(LOCALE_TO_BCP47[locale], {
      weekday: 'short',
    }).format(date);
    return `${dateStr} (${weekday}) ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} (KST)`;
  }

  return dateStr;
};

export function FormDatePickerDrawerV2({
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
  optionalBracketsText,
  helperText,
  openingHours,
}: FormDatePickerDrawerV2Props) {
  const resolvedPlaceholder = placeholder ?? DEFAULT_PLACEHOLDER_BY_LOCALE[locale];
  const confirmLabel = dict?.common?.confirm ?? '확인';

  const minMonth = yearRange ? new Date(yearRange.from, 0, 1) : undefined;
  const maxMonth = yearRange ? new Date(yearRange.to, 11, 1) : undefined;

  const openPicker = async () => {
    const picked = await openDrawer<Date | undefined>({
      content: (
        <DatePickerDrawerContentV2
          initialValue={value}
          locale={locale}
          dict={dict}
          disabled={disabled}
          confirmLabel={confirmLabel}
          titlePlaceholder={resolvedPlaceholder}
          minMonth={minMonth}
          maxMonth={maxMonth}
          openingHours={openingHours}
        />
      ),
    });
    if (picked instanceof Date) {
      onChange(picked);
    }
  };

  const stateClass = buildStateClass(value, error);
  const triggerClasses = `${baseInputClasses} h-[52px] p-4 flex items-center justify-between bg-white ${stateClass}`;

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel
        label={label}
        required={required}
        optionalText={
          !required && !hideOptionalText ? optionalBracketsText : undefined
        }
      />

      <button type='button' onClick={openPicker} className={triggerClasses}>
        <span className={value ? 'text-neutral-900' : 'text-neutral-400'}>
          {value ? formatDisplayDate(value, locale) : resolvedPlaceholder}
        </span>
        <span className='flex items-center text-neutral-400'>
          <CalendarIcon className='h-5 w-5' />
        </span>
      </button>

      <FieldError message={error} />
      {helperText ? <p className='text-xs text-neutral-500'>{helperText}</p> : null}
    </div>
  );
}

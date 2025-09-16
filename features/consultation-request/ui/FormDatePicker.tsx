'use client';

import { type Locale } from 'shared/config';
import { DatePicker } from 'shared/ui/date-picker';

interface FormDatePickerProps {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  locale: Locale;
  placeholder?: string;
  error?: string;
  disabled?: (date: Date) => boolean;
}

export function FormDatePicker({
  label,
  value,
  onChange,
  locale,
  placeholder,
  error,
  disabled,
}: FormDatePickerProps) {
  // 과거 날짜 비활성화 (오늘 포함해서 미래만 선택 가능)
  const disablePastDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || (disabled ? disabled(date) : false);
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <DatePicker
        value={value}
        onChange={onChange}
        locale={locale}
        placeholder={placeholder}
        disabled={disablePastDates}
      />
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

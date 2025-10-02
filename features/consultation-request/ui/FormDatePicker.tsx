'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { DatePicker } from 'shared/ui/simple-date-picker';

interface FormDatePickerProps {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  locale: Locale;
  dict?: Dictionary;
  placeholder?: string;
  error?: string;
  disabled?: (date: Date) => boolean;
  required?: boolean;
}

export function FormDatePicker({
  label,
  value,
  onChange,
  locale,
  dict,
  placeholder,
  error,
  disabled,
  required = true,
}: FormDatePickerProps) {
  // 과거 날짜 비활성화 (오늘 포함해서 미래만 선택 가능)
  const disablePastDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || (disabled ? disabled(date) : false);
  };

  // 현재 연도부터 미래 5년까지만 표시
  const currentYear = new Date().getFullYear();
  const yearRange = { from: currentYear, to: currentYear + 5 };

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      locale={locale}
      dict={dict}
      placeholder={placeholder}
      disabled={disablePastDates}
      error={error}
      required={required}
      yearRange={yearRange}
    />
  );
}

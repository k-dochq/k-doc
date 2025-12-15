'use client';

import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import {
  baseInputClasses,
  selectArrowSvg,
  focusClass,
  emptyBorder,
  filledBorder,
  errorBorder,
  disabledState,
} from './form-field-styles';

type Option = { value: string; label: string };

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function SelectFieldV2({
  label,
  value,
  onChange,
  options,
  placeholder = '선택해주세요',
  error,
  required,
  disabled,
}: SelectProps) {
  const isEmpty = value === '';
  const stateClass = error
    ? errorBorder
    : `${isEmpty ? emptyBorder : filledBorder} ${focusClass} ${
        isEmpty ? 'text-neutral-400' : 'text-neutral-900'
      }`;
  const className = `${baseInputClasses} pr-10 appearance-none ${stateClass} ${disabled ? disabledState : ''}`;

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={className}
        style={{
          backgroundImage: selectArrowSvg,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '20px',
          backgroundPosition: 'right 12px center',
        }}
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

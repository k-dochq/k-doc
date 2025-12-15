'use client';

import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';

type RadioOption = { value: string; label: string };

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly RadioOption[];
  error?: string;
  required?: boolean;
}

export function RadioGroupFieldV2({
  label,
  value,
  onChange,
  options,
  error,
  required,
}: RadioGroupProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <div className='flex flex-wrap gap-4'>
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 ${
                checked
                  ? 'border-primary-900 bg-primary-50 text-neutral-900'
                  : 'border-neutral-400 text-neutral-800'
              }`}
            >
              <input
                type='radio'
                name={label}
                value={option.value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                className='text-primary-900 focus:border-primary-900 h-4 w-4 border-neutral-400 focus:ring-0'
              />
              <span className='text-sm leading-5'>{option.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

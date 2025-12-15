'use client';

import { FieldError } from './FieldError';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
  error?: string;
}

export function CheckboxFieldV2({ checked, onChange, title, description, error }: CheckboxProps) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <label className='flex cursor-pointer items-start gap-3'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='text-primary-900 focus:border-primary-900 mt-0.5 h-4 w-4 rounded border-neutral-300 focus:ring-0'
        />
        <div className='flex flex-col gap-1 text-xs leading-4'>
          <div className='font-medium text-neutral-900'>{title}</div>
          <div className='font-normal text-neutral-500'>{description}</div>
        </div>
      </label>
      <FieldError message={error} />
    </div>
  );
}

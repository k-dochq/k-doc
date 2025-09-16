'use client';

import { type TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  error?: string;
  maxLength?: number;
  currentLength?: number;
}

export function FormTextarea({
  label,
  error,
  maxLength = 500,
  currentLength = 0,
  ...props
}: FormTextareaProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <div className='flex flex-col gap-1'>
        <textarea
          {...props}
          maxLength={maxLength}
          className={`min-h-[120px] w-full resize-none rounded-xl border bg-white px-4 py-4 text-sm leading-5 placeholder:font-normal placeholder:text-neutral-400 focus:border-transparent focus:ring-2 focus:ring-[#da47ef] focus:outline-none ${error ? 'border-red-500' : 'border-neutral-300'} `}
        />
        <div className='text-right text-[13px] leading-[19px] text-neutral-500'>
          {currentLength}/{maxLength}
        </div>
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

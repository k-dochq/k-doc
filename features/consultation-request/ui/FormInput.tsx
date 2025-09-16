'use client';

import { type InputHTMLAttributes } from 'react';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export function FormInput({ label, error, icon, ...props }: FormInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <div className='relative'>
        <input
          {...props}
          className={`w-full rounded-xl border bg-white px-4 py-4 text-sm leading-5 placeholder:font-normal placeholder:text-neutral-400 focus:border-transparent focus:ring-2 focus:ring-[#da47ef] focus:outline-none ${error ? 'border-red-500' : 'border-neutral-300'} `}
        />
        {icon && (
          <div className='absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-neutral-400'>
            {icon}
          </div>
        )}
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

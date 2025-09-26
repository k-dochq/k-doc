'use client';

import { forwardRef } from 'react';
import { cn } from 'shared/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
  showIcon?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, showIcon = false, className, ...props }, ref) => {
    return (
      <div className='flex w-full flex-col gap-2'>
        <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
        <div className='relative'>
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border border-neutral-300 bg-white px-4 py-4',
              'text-sm text-neutral-900 placeholder:text-neutral-400',
              'focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:ring-red-500',
              className,
            )}
            {...props}
          />
          {showIcon && (
            <div className='absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2'>
              {/* 아이콘 자리 - 필요시 추가 */}
            </div>
          )}
        </div>
        {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

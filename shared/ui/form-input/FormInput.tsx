'use client';

import { forwardRef } from 'react';
import { cn } from 'shared/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
  showIcon?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, showIcon = false, className, value, ...props }, ref) => {
    return (
      <div className='flex w-full flex-col gap-2'>
        <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
        <div className='relative'>
          <input
            ref={ref}
            value={value}
            className={cn(
              'w-full rounded-xl border px-4 py-4',
              'text-sm text-neutral-900 placeholder:text-neutral-400',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              value ? 'border-transparent' : 'border-neutral-300',
              error && 'border-red-500',
              className,
            )}
            style={{
              backgroundColor: 'white',
              backgroundImage: value
                ? 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)'
                : 'white',
              backgroundOrigin: value ? 'border-box' : undefined,
              backgroundClip: value ? 'padding-box, border-box' : undefined,
              backgroundSize: value ? '100% 100%, 100% 100%' : undefined,
            }}
            onFocus={(e) => {
              if (!value) {
                e.target.style.backgroundImage =
                  'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)';
                e.target.style.backgroundOrigin = 'border-box';
                e.target.style.backgroundClip = 'padding-box, border-box';
                e.target.style.backgroundSize = '100% 100%, 100% 100%';
                e.target.style.borderColor = 'transparent';
              }
            }}
            onBlur={(e) => {
              if (!value) {
                e.target.style.backgroundImage = 'white';
                e.target.style.backgroundOrigin = 'initial';
                e.target.style.backgroundClip = 'initial';
                e.target.style.backgroundSize = 'initial';
                e.target.style.borderColor = '';
              }
            }}
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

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
  value,
  ...props
}: FormTextareaProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <div className='flex flex-col gap-1'>
        <textarea
          {...props}
          value={value}
          maxLength={maxLength}
          className={`min-h-[120px] w-full resize-none rounded-xl border px-4 py-4 text-sm leading-5 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none ${
            value ? 'border-transparent' : 'border-neutral-300'
          } ${error ? 'border-red-500' : ''}`}
          style={{
            backgroundColor: 'white',
            backgroundImage: value 
              ? 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)'
              : 'white',
            backgroundOrigin: value ? 'border-box' : undefined,
            backgroundClip: value 
              ? 'padding-box, border-box'
              : undefined,
            backgroundSize: value 
              ? '100% 100%, 100% 100%'
              : undefined,
          }}
          onFocus={(e) => {
            if (!value) {
              e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(90deg, rgb(255, 96, 247) 0%, rgb(174, 51, 251) 100%)';
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
        />
        <div className='text-right text-[13px] leading-[19px] text-neutral-500'>
          {currentLength}/{maxLength}
        </div>
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

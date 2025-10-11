'use client';

import { type InputHTMLAttributes } from 'react';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export function FormInput({ label, error, icon, value, ...props }: FormInputProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <div className='relative'>
        <input
          {...props}
          value={value}
          className={`w-full rounded-xl border px-4 py-4 text-sm leading-5 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none ${
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

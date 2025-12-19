'use client';

import { type InputHTMLAttributes, type ReactNode } from 'react';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import { baseInputClasses, buildStateClass, disabledState } from './form-field-styles';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  rightIcon?: ReactNode;
};

export function InputFieldV2({
  label,
  required,
  error,
  helperText,
  disabled,
  rightIcon,
  ...props
}: InputProps) {
  // disabled일 때는 disabled 스타일이 우선 적용되도록 처리
  // error가 있으면 error border 유지, 없으면 neutral-200 border 적용
  const borderClass = disabled
    ? error
      ? 'border-[#f31110] focus:border-[#f31110]'
      : 'border-neutral-200'
    : '';

  // disabled일 때는 stateClass를 적용하지 않고 disabled 스타일만 적용
  // disabled가 아닐 때만 stateClass 적용
  const stateClass = disabled ? '' : buildStateClass(props.value, error);
  const finalStateClass = disabled ? borderClass : stateClass;

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <div className='relative'>
        <input
          {...props}
          disabled={disabled}
          className={`${baseInputClasses} h-[52px] ${finalStateClass} ${disabled ? disabledState : ''} ${
            rightIcon ? 'pr-11' : ''
          }`}
        />
        {rightIcon && (
          <div className='pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-400'>
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && !error && <p className='text-xs text-neutral-500'>{helperText}</p>}
      <FieldError message={error} />
    </div>
  );
}

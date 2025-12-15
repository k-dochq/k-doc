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
  const stateClass = buildStateClass(props.value, error);

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <div className='relative'>
        <input
          {...props}
          disabled={disabled}
          className={`${baseInputClasses} ${stateClass} ${disabled ? disabledState : ''} ${
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

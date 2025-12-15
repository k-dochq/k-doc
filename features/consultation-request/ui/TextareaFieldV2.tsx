'use client';

import { type TextareaHTMLAttributes } from 'react';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import { baseInputClasses, buildStateClass, disabledState } from './form-field-styles';

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
  label: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
  helperText?: string;
};

export function TextareaFieldV2({
  label,
  required,
  error,
  maxLength = 500,
  currentLength = 0,
  disabled,
  helperText,
  ...props
}: TextareaProps) {
  const stateClass = buildStateClass(props.value, error);

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <div className='flex flex-col gap-1'>
        <textarea
          {...props}
          disabled={disabled}
          maxLength={maxLength}
          className={`${baseInputClasses} min-h-[120px] resize-none ${stateClass} ${
            disabled ? disabledState : ''
          }`}
        />
        <div className='text-right text-[13px] leading-[19px] text-neutral-500'>
          {currentLength}/{maxLength}
        </div>
      </div>
      {helperText && !error ? <p className='text-xs text-neutral-500'>{helperText}</p> : null}
      <FieldError message={error} />
    </div>
  );
}

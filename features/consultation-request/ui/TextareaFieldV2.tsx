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
      <div className='relative'>
        <textarea
          {...props}
          disabled={disabled}
          maxLength={maxLength}
          className={`${baseInputClasses} min-h-[120px] resize-none pr-16 pb-10 ${stateClass} ${
            disabled ? disabledState : 'bg-white'
          }`}
        />
        <div className='pointer-events-none absolute right-4 bottom-3 text-sm text-neutral-400'>
          {currentLength}/{maxLength}
        </div>
      </div>
      {helperText && !error ? <p className='text-xs text-neutral-500'>{helperText}</p> : null}
      <FieldError message={error} />
    </div>
  );
}

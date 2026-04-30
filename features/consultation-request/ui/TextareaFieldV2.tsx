'use client';

import { type TextareaHTMLAttributes } from 'react';
import { cn } from 'shared/lib/utils';
import { FieldLabel } from './FieldLabel';
import { FieldError } from './FieldError';
import { buildWrapperStateClass, disabledState } from './form-field-styles';

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
  const wrapperStateClass = buildWrapperStateClass(props.value, error);

  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} required={required} />
      <div
        className={cn(
          'flex w-full flex-col rounded-xl border px-4 py-3.5 transition-colors duration-150',
          wrapperStateClass,
          disabled ? disabledState : 'bg-white',
        )}
      >
        <textarea
          {...props}
          disabled={disabled}
          maxLength={maxLength}
          className='block min-h-[88px] w-full resize-none border-0 bg-transparent p-0 text-sm leading-6 text-neutral-900 placeholder:text-neutral-400 focus:outline-none'
        />
        <div className='mt-2 text-right text-sm text-neutral-400'>
          {currentLength}/{maxLength}
        </div>
      </div>
      {helperText && !error ? <p className='text-xs text-neutral-500'>{helperText}</p> : null}
      <FieldError message={error} />
    </div>
  );
}

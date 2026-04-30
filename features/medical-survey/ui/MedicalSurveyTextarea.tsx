'use client';

import { type TextareaHTMLAttributes } from 'react';
import { cn } from 'shared/lib/utils';
import { buildWrapperStateClass } from 'features/consultation-request/ui/form-field-styles';

interface MedicalSurveyTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  placeholder?: string;
  maxLength?: number;
  currentLength?: number;
}

export function MedicalSurveyTextarea({
  placeholder,
  maxLength = 2000,
  currentLength = 0,
  value,
  ...props
}: MedicalSurveyTextareaProps) {
  const wrapperStateClass = buildWrapperStateClass(value, undefined);
  const textValue = typeof value === 'string' ? value : '';
  const displayLength = currentLength || textValue.length;

  return (
    <div
      className={cn(
        'flex h-[216px] w-full flex-col rounded-xl border bg-white px-4 py-3.5 transition-colors duration-150',
        wrapperStateClass,
      )}
    >
      <textarea
        {...props}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        className='block w-full flex-1 resize-none border-0 bg-transparent p-0 text-sm leading-6 text-neutral-900 placeholder:text-neutral-400 focus:outline-none'
      />
      <div className='mt-2 text-right text-sm text-neutral-400'>
        {displayLength}/{maxLength}
      </div>
    </div>
  );
}

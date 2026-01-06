'use client';

import { type TextareaHTMLAttributes } from 'react';
import {
  baseInputClasses,
  buildStateClass,
} from 'features/consultation-request/ui/form-field-styles';

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
  const stateClass = buildStateClass(value, undefined);
  const textValue = typeof value === 'string' ? value : '';
  const displayLength = currentLength || textValue.length;

  return (
    <div className='relative w-full'>
      <textarea
        {...props}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${baseInputClasses} h-[216px] resize-none pr-16 pb-10 ${stateClass} bg-white`}
      />
      <div className='pointer-events-none absolute right-4 bottom-3 text-sm text-neutral-400'>
        {displayLength}/{maxLength}
      </div>
    </div>
  );
}

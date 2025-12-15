'use client';

import { type ReactNode } from 'react';

interface FieldLabelProps {
  label: string;
  required?: boolean;
  optionalText?: string;
  className?: string;
  icon?: ReactNode;
}

export function FieldLabel({ label, required, optionalText, className, icon }: FieldLabelProps) {
  return (
    <label
      className={`inline-flex items-center text-base leading-6 font-semibold text-neutral-700 ${className || ''}`}
    >
      {icon ? <span className='mr-2 flex items-center'>{icon}</span> : null}
      <span>{label}</span>
      {required ? (
        <span className='ml-1 text-base font-medium text-[#f31110]'>*</span>
      ) : optionalText ? (
        <span className='ml-1 text-sm font-medium text-neutral-500'>[{optionalText}]</span>
      ) : null}
    </label>
  );
}

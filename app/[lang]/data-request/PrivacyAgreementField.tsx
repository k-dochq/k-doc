'use client';

import { Check } from 'lucide-react';

interface PrivacyAgreementFieldProps {
  label: string;
  description: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
}

export function PrivacyAgreementField({
  label,
  description,
  checked,
  error,
  onChange,
}: PrivacyAgreementFieldProps) {
  return (
    <div>
      <p className='mb-2 text-base leading-6 font-semibold text-neutral-700'>
        {label} <span className='text-[#f31110]'>*</span>
      </p>
      <label className='flex items-start gap-2 rounded-lg'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='sr-only'
        />
        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
            checked ? 'border-primary-900 bg-primary-900' : 'border-neutral-300 bg-white'
          }`}
        >
          {checked ? <Check className='h-3.5 w-3.5 text-white' /> : null}
        </span>
        <span className='text-sm leading-5 text-neutral-500'>{description}</span>
      </label>
      {error ? <p className='mt-2 text-xs text-[#f31110]'>{error}</p> : null}
    </div>
  );
}

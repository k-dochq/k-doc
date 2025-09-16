'use client';

import { useState } from 'react';
// ChevronDown 아이콘 SVG 컴포넌트
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
  </svg>
);

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  error?: string;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = '선택해주세요',
  error,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className='flex w-full flex-col gap-2'>
      <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>
      <div className='relative'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-4 text-left text-sm leading-5 focus:border-transparent focus:ring-2 focus:ring-[#da47ef] focus:outline-none ${error ? 'border-red-500' : 'border-neutral-300'} ${!selectedOption ? 'text-neutral-400' : 'text-neutral-900'} `}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDownIcon
            className={`h-5 w-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className='absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-xl border border-neutral-300 bg-white shadow-lg'>
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm leading-5 hover:bg-neutral-50 ${value === option.value ? 'bg-[#da47ef]/10 text-[#da47ef]' : 'text-neutral-900'} first:rounded-t-xl last:rounded-b-xl`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

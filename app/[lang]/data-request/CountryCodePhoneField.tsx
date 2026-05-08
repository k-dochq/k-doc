'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CountryOption {
  value: string;
  label: string;
  key: string;
}

interface CountryCodePhoneFieldProps {
  label: string;
  countryCode: string;
  phone: string;
  placeholder: string;
  error?: string;
  countryOptions: CountryOption[];
  onCountryCodeChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export function CountryCodePhoneField({
  label,
  countryCode,
  phone,
  placeholder,
  error,
  countryOptions,
  onCountryCodeChange,
  onPhoneChange,
}: CountryCodePhoneFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div className='flex w-full flex-col gap-2'>
      <p className='text-base leading-6 font-semibold text-neutral-700'>
        {label} <span className='text-[#f31110]'>*</span>
      </p>
      <div className='flex gap-2'>
        <div ref={containerRef} className='relative min-w-[80px]'>
          <button
            type='button'
            onClick={() => setIsOpen((prev) => !prev)}
            className='flex h-[52px] w-full items-center gap-1 rounded-xl border border-neutral-400 bg-white px-4 pr-4 text-sm text-neutral-700'
          >
            <span>{countryCode}</span>
            <Image
              src='/icons/select-chevron.svg'
              alt=''
              aria-hidden
              width={8}
              height={13}
              className='h-[13px] w-2 rotate-90'
            />
          </button>
          {isOpen ? (
            <div className='absolute top-[calc(100%+4px)] left-0 z-30 max-h-64 min-w-[120px] overflow-y-auto rounded-xl border border-neutral-300 bg-white py-1 shadow-sm'>
              {countryOptions.map((option) => (
                <button
                  key={option.key}
                  type='button'
                  onClick={() => {
                    onCountryCodeChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm ${
                    option.value === countryCode
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <input
          type='tel'
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={placeholder}
          className='h-[52px] flex-1 rounded-xl border border-neutral-400 bg-white px-4 text-sm text-neutral-700 placeholder:text-neutral-400'
        />
      </div>
      {error ? <p className='text-xs text-[#f31110]'>{error}</p> : null}
    </div>
  );
}

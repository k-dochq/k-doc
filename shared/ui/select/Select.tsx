import React from 'react';
import { cn } from 'shared/lib';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

export function Select({ label, error, className, children, ...props }: SelectProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      {label && <label className='text-sm leading-5 font-medium text-neutral-900'>{label}</label>}
      <select
        className={cn(
          'w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 pr-10 text-sm text-neutral-900',
          'focus:border-transparent focus:ring-2 focus:ring-[#DA47EF] focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        style={{
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M16.25 7.08325L10.4167 12.9166L4.58333 7.08325' stroke='%23A3A3A3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '20px',
          backgroundPosition: 'right 12px center',
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p className='text-sm leading-5 text-red-500'>{error}</p>}
    </div>
  );
}

'use client';

import { forwardRef } from 'react';
import { cn } from 'shared/lib/utils';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl font-normal transition-colors',
          'focus:ring-2 focus:ring-offset-2 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          {
            // Variants
            'bg-[#DA47EF] text-white hover:bg-[#C63DE7] focus:ring-[#DA47EF]':
              variant === 'primary',
            'bg-transparent text-neutral-500 hover:text-neutral-700': variant === 'secondary',
            // Sizes
            'px-10 py-4 text-base leading-6': size === 'md',
            'px-8 py-3 text-sm leading-5': size === 'sm',
            'px-12 py-5 text-lg leading-7': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {loading && (
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
        )}
        {children}
      </button>
    );
  },
);

FormButton.displayName = 'FormButton';

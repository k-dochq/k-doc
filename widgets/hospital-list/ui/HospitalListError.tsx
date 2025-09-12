'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HospitalListErrorProps {
  lang: Locale;
  dict: Dictionary;
  error?: Error;
  onRetry?: () => void;
}

export function HospitalListError({ lang, dict, error, onRetry }: HospitalListErrorProps) {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>{dict.hospitalList.title}</h2>
      </div>
      <div className='flex flex-col items-center justify-center py-8 text-center'>
        <div className='mb-4'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
            <svg
              className='h-6 w-6 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
        </div>
        <h3 className='mb-2 text-sm font-medium text-gray-900'>
          {dict.hospitalList.error.message}
        </h3>
        {error && (
          <p className='mb-4 max-w-sm text-xs text-gray-500'>
            {error.message || 'Unknown error occurred'}
          </p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm leading-4 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            {dict.hospitalList.error.retryButton}
          </button>
        )}
      </div>
    </div>
  );
}

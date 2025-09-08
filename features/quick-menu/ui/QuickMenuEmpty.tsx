'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface QuickMenuEmptyProps {
  lang: Locale;
  dict: Dictionary;
}

export function QuickMenuEmpty({ lang, dict }: QuickMenuEmptyProps) {
  return (
    <div className='w-full'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold text-gray-900'>{dict.quickMenu.title}</h2>
      </div>
      <div className='flex flex-col items-center justify-center py-8 text-center'>
        <div className='mb-4'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
            <svg
              className='h-6 w-6 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
        </div>
        <h3 className='mb-2 text-sm font-medium text-gray-900'>{dict.quickMenu.empty.message}</h3>
        <p className='max-w-sm text-xs text-gray-500'>{dict.quickMenu.empty.description}</p>
      </div>
    </div>
  );
}

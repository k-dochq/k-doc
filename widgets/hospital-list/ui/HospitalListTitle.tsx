'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HospitalListTitleProps {
  lang: Locale;
  dict: Dictionary;
  onViewAll?: () => void;
}

export function HospitalListTitle({ lang, dict, onViewAll }: HospitalListTitleProps) {
  return (
    <div className='flex w-full items-center justify-between'>
      <h2 className='text-xl leading-7 font-semibold text-neutral-900'>
        {dict.hospitalList.title}
      </h2>

      <button
        onClick={onViewAll}
        className='flex items-center gap-0.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-700'
      >
        <span className='leading-5'>{dict.hospitalList.viewAll}</span>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='scale-y-[-100%] transform'
        >
          <path
            d='M6 12L10 8L6 4'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
}

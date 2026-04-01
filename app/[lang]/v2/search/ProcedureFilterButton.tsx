'use client';

import { type Dictionary } from 'shared/model/types';

interface ProcedureFilterButtonProps {
  dict: Dictionary;
}

export function ProcedureFilterButton({ dict }: ProcedureFilterButtonProps) {
  return (
    <button className='flex items-center justify-center gap-[2px] rounded-lg border border-[#e5e5e5] bg-white px-2 py-[6px]'>
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
        <g clipPath='url(#clip0_5976_29070)'>
          <path
            d='M5.5 17C5.5 15.0668 7.06683 13.5 9 13.5C7.06683 13.5 5.5 11.9332 5.5 10C5.5 11.9332 3.93317 13.5 2 13.5C3.93317 13.5 5.5 15.0668 5.5 17Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6 7.5C9.03783 7.5 11.5 5.03783 11.5 2C11.5 5.03783 13.9622 7.5 17 7.5C13.9622 7.5 11.5 9.96217 11.5 13C11.5 9.96217 9.03783 7.5 6 7.5Z'
            stroke='#404040'
            strokeWidth='1.5'
            strokeMiterlimit='10'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3.5 1.5V3.5M3.5 5.5V3.5M3.5 3.5H5.5M3.5 3.5H1.5'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_5976_29070'>
            <rect width='18' height='18' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <p className="font-['Pretendard'] text-sm font-semibold leading-5 text-[#404040]">
        {dict.search?.filter?.procedure}
      </p>
    </button>
  );
}

'use client';

import { LocaleLink } from 'shared/ui/locale-link';
import { type Locale } from 'shared/config';

interface ExploreClinicsButtonProps {
  text: string;
  locale?: Locale;
}

export function ExploreClinicsButton({ text, locale }: ExploreClinicsButtonProps) {
  const isRtl = locale === 'ar';

  return (
    <LocaleLink href='/hospitals' className='block w-full'>
      <button
        type='button'
        dir={isRtl ? 'rtl' : undefined}
        className='relative flex w-full items-center justify-center gap-2 rounded-full bg-[#ff5dca] py-4 text-white shadow-[inset_4px_4px_6px_0px_rgba(255,255,255,0.6),inset_-4px_-6px_8px_0px_rgba(198,23,141,0.6)]'
      >
        <span className='text-[20px] leading-[1.3] font-semibold tracking-[-0.4px]'>{text}</span>
        <span className={`shrink-0 ${isRtl ? 'rotate-180' : ''}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M9 5L16 12L9 19'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </button>
    </LocaleLink>
  );
}

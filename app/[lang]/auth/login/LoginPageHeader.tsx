'use client';

import { HeaderLogoV2 } from 'widgets/header/ui/HeaderLogoV2';
import { LocaleLink } from 'shared/ui/locale-link';

export function LoginPageHeader() {
  return (
    <div className='flex w-full items-center px-5 py-4'>
      <LocaleLink href='/main' aria-label='K-DOC 홈으로 이동'>
        <HeaderLogoV2 />
      </LocaleLink>

      <LocaleLink
        href='/main'
        aria-label='닫기'
        className='ml-auto flex h-6 w-6 items-center justify-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M12 12L6 6M12 12L18 18M12 12L18 6M12 12L6 18'
            stroke='#404040'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </LocaleLink>
    </div>
  );
}

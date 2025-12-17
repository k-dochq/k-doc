'use client';

import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LocaleLink } from 'shared/ui/locale-link';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HeaderProfileV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function HeaderProfileV2({ lang, dict }: HeaderProfileV2Props) {
  const { isAuthenticated } = useAuth();
  const router = useLocalizedRouter();

  const handleClick = async (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      await openDrawer({
        content: <LoginRequiredDrawer lang={lang} />,
      });
    }
  };

  return (
    <LocaleLink
      href='/my'
      onClick={handleClick}
      className='rounded-lg text-neutral-900'
      aria-label='프로필'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </LocaleLink>
  );
}

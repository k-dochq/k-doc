'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { RecentLoginBadge } from 'features/auth-login-social/ui/RecentLoginBadge';

interface EmailLastLoginButtonV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

function EmailLastLoginIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M17.5 14.1667V5.83335C17.5 5.39133 17.3244 4.9674 17.0118 4.65484C16.6993 4.34228 16.2754 4.16669 15.8333 4.16669H4.16667C3.72464 4.16669 3.30072 4.34228 2.98816 4.65484C2.67559 4.9674 2.5 5.39133 2.5 5.83335V14.1667C2.5 14.6087 2.67559 15.0326 2.98816 15.3452C3.30072 15.6578 3.72464 15.8334 4.16667 15.8334H15.8333C16.2754 15.8334 16.6993 15.6578 17.0118 15.3452C17.3244 15.0326 17.5 14.6087 17.5 14.1667Z'
        fill='#404040'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.83301 7.5L8.95801 10C9.25361 10.2367 9.621 10.3656 9.99967 10.3656C10.3784 10.3656 10.7457 10.2367 11.0413 10L14.1663 7.5'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function EmailLastLoginButtonV2({ lang, dict, redirectTo }: EmailLastLoginButtonV2Props) {
  const href = redirectTo
    ? `/auth/login/email?redirectTo=${encodeURIComponent(redirectTo)}`
    : '/auth/login/email';

  const label = dict.auth?.login?.emailLogin ?? 'Continue with Email';

  return (
    <div className='relative'>
      <RecentLoginBadge lang={lang} />
      <LocaleLink
        href={href}
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('kdoc_recent_login_method', 'email');
          }
        }}
        className='flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-5 py-4 text-base leading-6 font-medium text-[#404040]'
      >
        <EmailLastLoginIcon />
        <span>{label}</span>
      </LocaleLink>
    </div>
  );
}

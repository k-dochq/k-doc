'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface EmailSignInButtonProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  redirectTo?: string;
}

export function EmailSignInButton({
  lang,
  dict,
  className = '',
  redirectTo,
}: EmailSignInButtonProps) {
  const href = redirectTo
    ? `/auth/login/email?redirectTo=${encodeURIComponent(redirectTo)}`
    : '/auth/login/email';

  return (
    <LocaleLink
      href={href}
      className={`block w-full rounded-xl bg-[#DA47EF] px-6 py-4 text-center transition-all hover:bg-[#C63DE7] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none ${className}`}
    >
      <span className='text-base font-medium text-white'>
        {dict.auth?.login?.emailLogin || '이메일로 시작'}
      </span>
    </LocaleLink>
  );
}

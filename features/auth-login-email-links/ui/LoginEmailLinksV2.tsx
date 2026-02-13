'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface LoginEmailLinksV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function LoginEmailLinksV2({ redirectTo, dict }: LoginEmailLinksV2Props) {
  return (
    <div className='mt-6 flex max-w-[335px] items-center justify-center gap-6'>
      <LocaleLink
        href={
          redirectTo
            ? `/auth/login/email?redirectTo=${encodeURIComponent(redirectTo)}`
            : '/auth/login/email'
        }
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('kdoc_recent_login_method', 'email');
          }
        }}
        className='text-center text-sm font-medium text-[#737373] underline underline-offset-[3px]'
      >
        {dict.auth?.login?.emailLogin || '이메일로 시작'}
      </LocaleLink>

      <div className='h-3 w-px bg-[#d4d4d4]' />

      <LocaleLink
        href='/auth/signup'
        className='text-center text-sm font-medium text-[#737373] underline underline-offset-[3px]'
      >
        {dict.auth?.login?.signupButton || '이메일로 가입'}
      </LocaleLink>
    </div>
  );
}

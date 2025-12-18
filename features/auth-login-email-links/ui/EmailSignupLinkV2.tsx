'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface EmailSignupLinkV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function EmailSignupLinkV2({ lang, dict, redirectTo }: EmailSignupLinkV2Props) {
  return (
    <div className='mt-11 flex items-center justify-center'>
      <LocaleLink
        href={
          redirectTo ? `/auth/signup?redirectTo=${encodeURIComponent(redirectTo)}` : '/auth/signup'
        }
        className='text-sm leading-5 font-medium text-[#737373] underline'
      >
        {dict.auth?.login?.signUp || '이메일로 가입'}
      </LocaleLink>
    </div>
  );
}

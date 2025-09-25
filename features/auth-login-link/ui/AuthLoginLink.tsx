'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';

interface AuthLoginLinkProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

/**
 * 회원가입 페이지에서 로그인 링크를 표시하는 컴포넌트
 */
export function AuthLoginLink({ lang, dict, redirectTo }: AuthLoginLinkProps) {
  return (
    <div className='flex items-center justify-center gap-4'>
      <span className='text-sm leading-5 text-neutral-500'>
        {dict.auth?.signup?.alreadyHaveAccount || '이미 회원이신가요?'}
      </span>
      <div className='flex h-0 w-0 items-center justify-center'>
        <div className='h-0 w-2.5 rotate-90 border-t border-neutral-300' />
      </div>
      <LocaleLink
        href={
          redirectTo
            ? `/auth/login/email?redirectTo=${encodeURIComponent(redirectTo)}`
            : '/auth/login/email'
        }
        className='text-sm leading-5 text-neutral-500 hover:text-neutral-700'
      >
        {dict.auth?.signup?.loginLink || '로그인하기'}
      </LocaleLink>
    </div>
  );
}

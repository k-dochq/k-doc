'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { EmailLoginFormV2 } from 'features/email-auth';

interface LoginEmailContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function LoginEmailContentV2({ lang, dict, redirectTo }: LoginEmailContentV2Props) {
  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.auth?.login?.emailLogin || '이메일로 로그인'}
        fallbackUrl={`/${lang}/auth/login`}
      />

      <div className='h-[58px]' />
      <div className='p-5'>
        <EmailLoginFormV2 lang={lang} dict={dict} redirectTo={redirectTo} />
      </div>
    </div>
  );
}

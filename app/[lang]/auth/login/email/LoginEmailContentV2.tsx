'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';

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
      {/* 이후 이메일 로그인 폼 V2를 여기에 추가 예정 */}
    </div>
  );
}

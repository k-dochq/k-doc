'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface ForgotPasswordContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function ForgotPasswordContentV2({ lang, dict, redirectTo }: ForgotPasswordContentV2Props) {
  const title = dict.auth?.forgotPassword?.title || '비밀번호 찾기';
  const descriptionLine1 =
    dict.auth?.forgotPassword?.descriptionLine1 || '가입하신 이메일 주소를 입력하시면';
  const descriptionLine2 =
    dict.auth?.forgotPassword?.descriptionLine2 || '비밀번호 재설정 링크를 보내드립니다.';

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 title='' fallbackUrl={`/${lang}/auth/login`} />
      <div className='h-[58px]' />
      <div className='flex flex-col items-center px-5 py-[80px] text-center'>
        <h1 className='text-3xl font-semibold text-neutral-700'>{title}</h1>
        <p className='mt-2 text-base font-normal text-neutral-500'>
          {descriptionLine1}
          <br />
          {descriptionLine2}
        </p>
      </div>
    </div>
  );
}

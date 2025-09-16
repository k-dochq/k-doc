'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ForgotPasswordForm } from 'features/email-auth';

interface ForgotPasswordContentProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function ForgotPasswordContent({ lang, dict, redirectTo }: ForgotPasswordContentProps) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            {dict.auth?.forgotPassword?.title || '비밀번호 찾기'}
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            {dict.auth?.forgotPassword?.description ||
              '가입하신 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.'}
          </p>
        </div>
        <ForgotPasswordForm lang={lang} dict={dict} redirectTo={redirectTo} />
      </div>
    </div>
  );
}

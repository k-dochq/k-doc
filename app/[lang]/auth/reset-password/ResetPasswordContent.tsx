'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ResetPasswordForm } from 'features/email-auth';

interface ResetPasswordContentProps {
  lang: Locale;
  dict: Dictionary;
  tokenHash?: string;
  type?: string;
}

export function ResetPasswordContent({ lang, dict, tokenHash, type }: ResetPasswordContentProps) {
  // 토큰이 없거나 type이 recovery가 아닌 경우 에러 표시
  if (!tokenHash || type !== 'recovery') {
    return (
      <div className='flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <h3 className='mb-2 text-lg font-semibold text-red-800'>
              {dict.auth?.resetPassword?.error?.invalidLink?.title || 'Invalid Link'}
            </h3>
            <p className='text-sm text-red-600'>
              {dict.auth?.resetPassword?.error?.invalidLink?.description ||
                'The password reset link is invalid or has expired. Please try again.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            {dict.auth?.resetPassword?.title || 'Set New Password'}
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            {dict.auth?.resetPassword?.description || 'Enter your new password.'}
          </p>
        </div>
        <ResetPasswordForm lang={lang} dict={dict} tokenHash={tokenHash} />
      </div>
    </div>
  );
}

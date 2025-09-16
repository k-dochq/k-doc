'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormInput } from 'shared/ui/form-input';
import { FormButton } from 'shared/ui/form-button';
import { LocaleLink } from 'shared/ui/locale-link';
import { usePasswordReset } from '../model/usePasswordReset';

interface ForgotPasswordFormProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function ForgotPasswordForm({ lang, dict, redirectTo }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { resetPassword, isLoading, error, isSuccess } = usePasswordReset({ locale: lang, dict });

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError(dict.auth?.forgotPassword?.errors?.emailRequired || '이메일을 입력해주세요.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(
        dict.auth?.forgotPassword?.errors?.emailInvalid || '올바른 이메일 형식을 입력해주세요.',
      );
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    const result = await resetPassword(email);
    if (result.success) {
      // 성공 시 추가 처리는 컴포넌트 내에서 isSuccess 상태로 처리
    }
  };

  if (isSuccess) {
    return (
      <div className='flex w-full flex-col gap-5'>
        <div className='rounded-xl border border-green-200 bg-green-50 p-4'>
          <h3 className='mb-2 text-lg font-semibold text-green-800'>
            {dict.auth?.forgotPassword?.success?.title || '이메일이 전송되었습니다'}
          </h3>
          <p className='text-sm text-green-600'>
            {dict.auth?.forgotPassword?.success?.description ||
              '입력하신 이메일 주소로 비밀번호 재설정 링크를 보내드렸습니다. 이메일을 확인해주세요.'}
          </p>
        </div>

        <div className='flex items-center justify-center gap-4'>
          <span className='text-sm leading-5 text-neutral-500'>
            {dict.auth?.forgotPassword?.backToLogin || '로그인 페이지로 돌아가기'}
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
            {dict.auth?.forgotPassword?.loginLink || '로그인하기'}
          </LocaleLink>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 이메일 입력 */}
        <FormInput
          label={dict.auth?.forgotPassword?.email || '이메일'}
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.auth?.forgotPassword?.placeholders?.email || 'your-email@example.com'}
          error={emailError}
          disabled={isLoading}
        />

        {/* 에러 메시지 */}
        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* 비밀번호 재설정 버튼 */}
        <FormButton type='submit' loading={isLoading} disabled={isLoading || !email}>
          {dict.auth?.forgotPassword?.resetButton || '비밀번호 재설정 링크 보내기'}
        </FormButton>
      </form>

      {/* 로그인 페이지로 돌아가기 링크 */}
      <div className='flex items-center justify-center gap-4'>
        <span className='text-sm leading-5 text-neutral-500'>
          {dict.auth?.forgotPassword?.backToLogin || '로그인 페이지로 돌아가기'}
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
          {dict.auth?.forgotPassword?.loginLink || '로그인하기'}
        </LocaleLink>
      </div>
    </div>
  );
}

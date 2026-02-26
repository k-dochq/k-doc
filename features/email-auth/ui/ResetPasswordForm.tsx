'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FormInput } from 'shared/ui/form-input';
import { FormButton } from 'shared/ui/form-button';
import { LocaleLink } from 'shared/ui/locale-link';
import { usePasswordUpdate } from '../model/usePasswordUpdate';

interface ResetPasswordFormProps {
  lang: Locale;
  dict: Dictionary;
  tokenHash: string;
}

export function ResetPasswordForm({ lang, dict, tokenHash }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { updatePassword, isLoading, error, isSuccess } = usePasswordUpdate({
    locale: lang,
    dict,
    tokenHash,
  });

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError(
        dict.auth?.resetPassword?.errors?.passwordRequired || '비밀번호를 입력해주세요.',
      );
      return false;
    }

    if (password.length < 6) {
      setPasswordError(
        dict.auth?.resetPassword?.errors?.passwordTooShort || '비밀번호는 6자 이상이어야 합니다.',
      );
      return false;
    }

    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string): boolean => {
    if (!confirmPassword) {
      setConfirmPasswordError(
        dict.auth?.resetPassword?.errors?.confirmPasswordRequired ||
          '비밀번호 확인을 입력해주세요.',
      );
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        dict.auth?.resetPassword?.errors?.passwordMismatch || '비밀번호가 일치하지 않습니다.',
      );
      return false;
    }

    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    const result = await updatePassword(password);
    if (result.success) {
      // 성공 시 추가 처리는 컴포넌트 내에서 isSuccess 상태로 처리
    }
  };

  if (isSuccess) {
    return (
      <div className='flex w-full flex-col gap-5'>
        <div className='rounded-xl border border-green-200 bg-green-50 p-4'>
          <h3 className='mb-2 text-lg font-semibold text-green-800'>
            {dict.auth?.resetPassword?.success?.title || '비밀번호가 변경되었습니다'}
          </h3>
          <p className='text-sm text-green-600'>
            {dict.auth?.resetPassword?.success?.description ||
              '비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인해주세요.'}
          </p>
        </div>

        <div className='flex items-center justify-center gap-4'>
          <span className='text-sm leading-5 text-neutral-500'>
            {dict.auth?.resetPassword?.goToLogin || '로그인 페이지로 이동'}
          </span>
          <div className='flex h-0 w-0 items-center justify-center'>
            <div className='h-0 w-2.5 rotate-90 border-t border-neutral-300' />
          </div>
          <LocaleLink
            href='/auth/login/email'
            className='text-sm leading-5 text-neutral-500 hover:text-neutral-700'
          >
            {dict.auth?.resetPassword?.loginLink || '로그인하기'}
          </LocaleLink>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-5'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        {/* 새 비밀번호 입력 */}
        <FormInput
          label={dict.auth?.resetPassword?.newPassword || '새 비밀번호'}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={
            dict.auth?.resetPassword?.placeholders?.newPassword || '새 비밀번호를 입력하세요'
          }
          error={passwordError}
          disabled={isLoading}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        {/* 비밀번호 확인 입력 */}
        <FormInput
          label={dict.auth?.resetPassword?.confirmPassword || '비밀번호 확인'}
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={
            dict.auth?.resetPassword?.placeholders?.confirmPassword || '비밀번호를 다시 입력하세요'
          }
          error={confirmPasswordError}
          disabled={isLoading}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        {/* 에러 메시지 */}
        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* 비밀번호 변경 버튼 */}
        <FormButton
          type='submit'
          loading={isLoading}
          disabled={isLoading || !password || !confirmPassword}
        >
          {dict.auth?.resetPassword?.updateButton || '비밀번호 변경'}
        </FormButton>
      </form>

      {/* 로그인 페이지로 돌아가기 링크 */}
      <div className='flex items-center justify-center gap-4'>
        <span className='text-sm leading-5 text-neutral-500'>
          {dict.auth?.resetPassword?.backToLogin || '로그인 페이지로 돌아가기'}
        </span>
        <div className='flex h-0 w-0 items-center justify-center'>
          <div className='h-0 w-2.5 rotate-90 border-t border-neutral-300' />
        </div>
        <LocaleLink
          href='/auth/login/email'
          className='text-sm leading-5 text-neutral-500 hover:text-neutral-700'
        >
          {dict.auth?.resetPassword?.loginLink || '로그인하기'}
        </LocaleLink>
      </div>
    </div>
  );
}

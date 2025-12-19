'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { InputFieldV2 } from 'features/consultation-request/ui/InputFieldV2';
import { usePasswordReset } from 'features/email-auth';

interface ForgotPasswordContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function ForgotPasswordContentV2({ lang, dict }: ForgotPasswordContentV2Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { resetPassword, isLoading, error, isSuccess } = usePasswordReset({ locale: lang, dict });

  const title = dict.auth?.forgotPassword?.title || '비밀번호 찾기';
  const descriptionLine1 =
    dict.auth?.forgotPassword?.descriptionLine1 || '가입하신 이메일 주소를 입력하시면';
  const descriptionLine2 =
    dict.auth?.forgotPassword?.descriptionLine2 || '비밀번호 재설정 링크를 보내드립니다.';

  const validateEmail = (email: string): boolean => {
    // 빈 이메일은 버튼 비활성화로 처리하므로 여기서는 검증하지 않음
    if (!email.trim()) {
      setEmailError('');
      return false;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError(
        dict.auth?.forgotPassword?.errors?.emailInvalid || '올바른 형식으로 입력해주세요.',
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
          <div className='mt-8 w-full max-w-md'>
            <div className='rounded-xl border border-green-200 bg-green-50 p-4'>
              <h3 className='mb-2 text-lg font-semibold text-green-800'>
                {dict.auth?.forgotPassword?.success?.title || '이메일이 전송되었습니다'}
              </h3>
              <p className='text-sm text-green-600'>
                {dict.auth?.forgotPassword?.success?.description ||
                  '입력하신 이메일 주소로 비밀번호 재설정 링크를 보내드렸습니다. 이메일을 확인해주세요.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <form onSubmit={handleSubmit} noValidate className='mt-8 w-full max-w-md'>
          <InputFieldV2
            label={dict.auth?.forgotPassword?.email || '이메일'}
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) {
                setEmailError('');
              }
            }}
            placeholder={dict.auth?.forgotPassword?.placeholders?.email || 'your-email@example.com'}
            error={emailError}
            disabled={isLoading}
          />

          {/* 에러 메시지 */}
          {error && (
            <div className='mt-5 rounded-xl border border-red-200 bg-red-50 p-4'>
              <p className='text-sm text-red-600'>{error}</p>
            </div>
          )}

          {/* 비밀번호 재설정 버튼 */}
          <button
            type='submit'
            disabled={isLoading || !email}
            className='bg-sub-900 hover:bg-sub-900/90 mt-5 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
          >
            {isLoading
              ? dict.auth?.forgotPassword?.loading || '전송 중...'
              : dict.auth?.forgotPassword?.resetButton || '비밀번호 재설정 링크 보내기'}
          </button>
        </form>
      </div>
    </div>
  );
}

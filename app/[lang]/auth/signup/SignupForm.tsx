'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { useEmailSignup } from 'features/email-auth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface SignupFormProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  redirectTo?: string;
}

export function SignupForm({ lang, dict, className = '', redirectTo }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useLocalizedRouter();

  const { signUpWithEmail, isLoading, error } = useEmailSignup({ locale: lang, dict });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      // 비밀번호 불일치는 useEmailSignup 훅의 error와 별도로 처리
      alert(dict.auth?.signup?.passwordMismatch || '비밀번호가 일치하지 않습니다');
      return;
    }

    const result = await signUpWithEmail(email, password);

    if (result.success) {
      // 회원가입 성공 시 redirectTo가 있으면 해당 페이지로, 없으면 로그인 페이지로 이동
      const targetUrl = redirectTo || '/auth/login';
      router.push(targetUrl);
    }
    // 에러는 useEmailSignup 훅에서 자동으로 처리됨
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            {dict.auth?.signup?.email || '이메일'}
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            placeholder='your-email@example.com'
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            {dict.auth?.signup?.password || '비밀번호'}
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            placeholder={
              lang === 'en'
                ? '6+ characters'
                : lang === 'th'
                  ? '6 ตัวอักษรขึ้นไป'
                  : '6자 이상의 비밀번호'
            }
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
            {dict.auth?.signup?.confirmPassword || '비밀번호 확인'}
          </label>
          <input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            placeholder={
              lang === 'en'
                ? 'Confirm your password'
                : lang === 'th'
                  ? 'ยืนยันรหัสผ่านของคุณ'
                  : '비밀번호를 다시 입력하세요'
            }
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        <button
          type='submit'
          disabled={isLoading || !email || !password || !confirmPassword}
          className='flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
              <span>{dict.auth?.signup?.loading || '가입 중...'}</span>
            </div>
          ) : (
            <span>{dict.auth?.signup?.signupButton || '회원가입'}</span>
          )}
        </button>
      </form>

      <div className='text-center'>
        <span className='text-sm text-gray-600'>
          {dict.auth?.signup?.alreadyHaveAccount || '이미 계정이 있으신가요?'}{' '}
        </span>
        <LocaleLink href='/auth/login' className='text-sm text-blue-600 hover:text-blue-500'>
          {dict.auth?.signup?.loginLink || '로그인하기'}
        </LocaleLink>
      </div>
    </div>
  );
}

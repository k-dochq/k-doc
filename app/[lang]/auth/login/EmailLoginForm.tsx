'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { useEmailLogin } from 'features/email-auth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface EmailLoginFormProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
  redirectTo?: string;
}

export function EmailLoginForm({ lang, dict, className = '', redirectTo }: EmailLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useLocalizedRouter();

  const { signInWithEmail, isLoading, error } = useEmailLogin({ locale: lang, dict });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    const result = await signInWithEmail(email, password);

    if (result.success) {
      // 로그인 성공 시 redirectTo가 있으면 해당 페이지로, 없으면 메인 페이지로 이동
      const targetUrl = redirectTo || '/';
      router.push(targetUrl);
    }
    // 에러는 useEmailLogin 훅에서 자동으로 처리됨
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            {dict.auth?.login?.email || '이메일'}
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
            {dict.auth?.login?.password || '비밀번호'}
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

        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        <button
          type='submit'
          disabled={isLoading || !email || !password}
          className='flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
              <span>{dict.auth?.login?.loading || '로딩 중...'}</span>
            </div>
          ) : (
            <span>{dict.auth?.login?.loginButton || '로그인'}</span>
          )}
        </button>
      </form>

      <div className='text-center'>
        <LocaleLink href='/auth/signup' className='text-sm text-blue-600 hover:text-blue-500'>
          {dict.auth?.login?.signUp || '회원가입'}
        </LocaleLink>
      </div>
    </div>
  );
}

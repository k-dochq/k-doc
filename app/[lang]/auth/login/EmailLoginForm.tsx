'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface EmailLoginFormProps {
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function EmailLoginForm({ lang, dict, className = '' }: EmailLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    // TODO: 실제 로그인 로직 구현
    try {
      // 임시로 2초 후 완료
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Email login:', { email, password });
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
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
        <button
          type='button'
          className='text-sm text-blue-600 hover:text-blue-500'
          disabled={isLoading}
        >
          {dict.auth?.login?.forgotPassword || '비밀번호를 잊으셨나요?'}
        </button>
      </div>

      <div className='text-center'>
        <button
          type='button'
          className='text-sm text-blue-600 hover:text-blue-500'
          disabled={isLoading}
        >
          {dict.auth?.login?.signUp || '회원가입'}
        </button>
      </div>
    </div>
  );
}

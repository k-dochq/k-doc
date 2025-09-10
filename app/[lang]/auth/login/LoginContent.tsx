import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SocialLoginSection } from './SocialLoginSection';

interface LoginContentProps {
  lang: Locale;
  dict: Dictionary;
}

export async function LoginContent({ lang, dict }: LoginContentProps) {
  return (
    <div className='space-y-6'>
      {/* 소셜 로그인 섹션 */}
      <SocialLoginSection lang={lang} dict={dict} />

      {/* 구분선 */}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300'></div>
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-gray-50 px-2 text-gray-500'>또는</span>
        </div>
      </div>

      {/* 이메일 로그인 폼 (향후 구현) */}
      <div className='space-y-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            {dict.auth?.login?.email || '이메일'}
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            disabled
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100'
            placeholder='이메일을 입력하세요'
          />
        </div>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            {dict.auth?.login?.password || '비밀번호'}
          </label>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            disabled
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100'
            placeholder='비밀번호를 입력하세요'
          />
        </div>
        <button
          type='submit'
          disabled
          className='flex w-full cursor-not-allowed justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm'
        >
          {dict.auth?.login?.loginButton || '로그인'} (준비중)
        </button>
      </div>

      {/* 하단 링크들 */}
      <div className='space-y-2 text-center'>
        <p className='text-sm text-gray-600'>
          계정이 없으신가요?{' '}
          <span className='cursor-not-allowed font-medium text-gray-400'>
            {dict.auth?.login?.signUp || '회원가입'} (준비중)
          </span>
        </p>
        <p className='text-sm'>
          <span className='cursor-not-allowed font-medium text-gray-400'>
            {dict.auth?.login?.forgotPassword || '비밀번호를 잊으셨나요?'} (준비중)
          </span>
        </p>
      </div>
    </div>
  );
}

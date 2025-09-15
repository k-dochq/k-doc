'use client';

import { useGoogleAuth } from '../model/useGoogleAuth';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { GoogleIcon } from 'shared/ui/icons';

interface GoogleSignInButtonProps {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  children?: React.ReactNode;
  redirectTo?: string;
}

export function GoogleSignInButton({ dict, className = '', children }: GoogleSignInButtonProps) {
  const { signInWithGoogle, isLoading, error } = useGoogleAuth();

  const handleClick = () => {
    signInWithGoogle();
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-4 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {!isLoading && <GoogleIcon />}
        {isLoading && (
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600' />
        )}
        <span className='text-base font-medium text-black'>
          {isLoading
            ? dict.auth?.login?.loading || '로딩 중...'
            : children || dict.auth?.login?.googleLogin || '구글로 시작'}
        </span>
      </button>
      {error && (
        <p className='text-center text-sm text-red-600'>
          {dict.auth?.login?.loginError || '로그인 중 오류가 발생했습니다'}: {error}
        </p>
      )}
    </div>
  );
}

'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useKakaoAuth } from '../model/useKakaoAuth';
import { KakaoIcon } from 'shared/ui/icons';

interface KakaoSignInButtonProps {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  children?: React.ReactNode;
}

export function KakaoSignInButton({
  locale,
  dict,
  className = '',
  children,
}: KakaoSignInButtonProps) {
  const { signInWithKakao, isLoading, error } = useKakaoAuth({ locale });

  const handleClick = async () => {
    const result = await signInWithKakao();
    if (result.error) {
      console.error('Kakao login error:', result.error);
    }
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-2 rounded-xl border border-[#FEE500] bg-[#FEE500] px-6 py-4 transition-all hover:bg-[#FEDD00] focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {!isLoading && <KakaoIcon />}
        {isLoading && (
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-yellow-600' />
        )}
        <span className='text-base font-medium text-black'>
          {isLoading
            ? dict.auth?.login?.loading || '로딩 중...'
            : children || dict.auth?.login?.kakaoLogin || '카카오로 시작'}
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

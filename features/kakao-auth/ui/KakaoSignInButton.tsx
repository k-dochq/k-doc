'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

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
  const handleClick = () => {
    // 카카오 로그인 로직 (향후 구현)
    console.log('Kakao login to be implemented');
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={handleClick}
        disabled={true} // 임시로 비활성화
        className={`flex w-full items-center justify-center gap-3 rounded-lg border border-yellow-400 bg-yellow-400 px-4 py-3 transition-colors hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 3C7.03 3 3 6.14 3 10.1c0 2.52 1.65 4.74 4.1 6.05L6.4 19.3c-.15.24-.02.56.26.65.08.03.17.03.25 0l3.92-2.06c.38.05.77.08 1.17.08 4.97 0 9-3.14 9-7.1S16.97 3 12 3z'
            fill='#3C1E1E'
          />
        </svg>
        <span className='font-medium text-gray-900'>
          {children || `${dict.auth?.login?.kakaoLogin || '카카오로 로그인'} (준비중)`}
        </span>
      </button>
    </div>
  );
}

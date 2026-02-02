'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { closeDrawer } from 'shared/lib/drawer';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getAuthPath } from 'shared/lib/auth/route-guard';
import { type Dictionary } from 'shared/model/types';

interface LoginRequiredDrawerProps {
  lang: Locale;
  dict: Dictionary;
  redirectPath?: string;
}

/**
 * 로그인 필요 시 표시되는 Drawer 컴포넌트
 * openDrawer의 content로 사용됩니다.
 */
export function LoginRequiredDrawer({ lang, dict, redirectPath }: LoginRequiredDrawerProps) {
  const router = useLocalizedRouter();

  // 언어별 로그인 필요 배경 이미지 분기
  // - ko/en: 영어 이미지 사용
  // - th/zh-Hant/ja/hi: 각 언어별 이미지 사용
  const imagePathByLocale: Record<Locale, string> = {
    en: '/images/login-required/login_required_background_en.png',
    ko: '/images/login-required/login_required_background_en.png',
    th: '/images/login-required/login_required_background_th.png',
    'zh-Hant': '/images/login-required/login_required_background_zh.png',
    ja: '/images/login-required/login_required_background_ja.png',
    hi: '/images/login-required/login_required_background_hi.png',
    tl: '/images/login-required/login_required_background_en.png',
    ar: '/images/login-required/login_required_background_ar.png',
  };

  const imagePath = imagePathByLocale[lang];

  const handleClose = () => {
    closeDrawer();
  };

  const handleLogin = () => {
    closeDrawer();

    // 리다이렉트 경로 설정
    const currentPath = redirectPath || window.location.pathname;
    const authPath = getAuthPath(lang);
    router.push(`${authPath}?redirect=${encodeURIComponent(currentPath)}`);
  };

  const loginButtonText = dict.auth?.login?.loginButton || 'Login';

  return (
    <div className='relative flex flex-col bg-white'>
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className='absolute top-[-50px] right-0 z-10 flex items-center justify-center'
        aria-label='Close'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
        >
          <path
            d='M16 16L8 8M16 16L24 24M16 16L24 8M16 16L8 24'
            stroke='#A3A3A3'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* 첫 번째 섹션: 배경 이미지 */}
      <div className='relative w-full' style={{ aspectRatio: '375/272' }}>
        <Image src={imagePath} alt='Login Required' fill className='object-cover' priority />
      </div>

      {/* 두 번째 섹션: 로그인 버튼 */}
      <div className='flex flex-col gap-4 px-5 pt-4 pb-10'>
        <button
          onClick={handleLogin}
          className='bg-sub-900 flex h-14 w-full items-center justify-center gap-2 rounded-xl px-5 py-4'
        >
          <p className='text-base leading-6 font-medium text-white'>{loginButtonText}</p>
        </button>
      </div>
    </div>
  );
}

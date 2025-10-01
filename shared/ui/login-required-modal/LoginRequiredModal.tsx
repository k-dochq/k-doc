'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { getAuthPath } from 'shared/lib/auth/route-guard';
import { closeModal } from 'shared/lib/modal';
import { CloseIcon } from 'shared/ui/close-icon';

interface LoginRequiredModalProps {
  lang: Locale;
  dict: Dictionary;
  redirectPath?: string;
  title?: string;
  message?: string;
  confirmText?: string;
}

/**
 * 로그인이 필요한 경우 표시하는 모달 컴포넌트
 * 재사용 가능한 공통 컴포넌트
 */
export function LoginRequiredModal({
  lang,
  dict,
  redirectPath,
  title = '로그인 필요',
  message = '이 기능을 사용하려면 로그인이 필요합니다.',
  confirmText,
}: LoginRequiredModalProps) {
  const router = useLocalizedRouter();

  const handleLogin = () => {
    closeModal();

    // 리다이렉트 경로 설정
    const currentPath = redirectPath || window.location.pathname;
    const authPath = getAuthPath(lang);
    router.push(`${authPath}?redirect=${encodeURIComponent(currentPath)}`);
  };

  const handleSignup = () => {
    closeModal();

    // 리다이렉트 경로 설정
    const currentPath = redirectPath || window.location.pathname;
    router.push(`/${lang}/auth/signup?redirect=${encodeURIComponent(currentPath)}`);
  };

  // 언어별 배경 이미지 경로 생성
  const getBackgroundImagePath = (locale: Locale): string => {
    const localeMap = {
      ko: 'ko',
      en: 'en',
      th: 'th',
    };
    return `/images/shared/login_required_bg_${localeMap[locale]}.png`;
  };

  return (
    <div className='relative'>
      {/* X 버튼 */}
      <button className='absolute -top-8 right-0 z-10' onClick={closeModal}>
        <CloseIcon />
      </button>

      <div className='relative flex min-h-[361px] flex-col justify-end overflow-hidden rounded-xl'>
        {/* 배경 이미지 */}
        <Image
          src={getBackgroundImagePath(lang)}
          alt='Login required background'
          fill
          className='object-cover'
          priority
          placeholder='blur'
          blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo='
        />

        {/* 컨텐츠 오버레이 */}
        <div className='relative z-10 px-4 py-6'>
          {/* <div className='mb-6 flex w-full justify-center'>
            <h2 className='text-center text-xl font-bold whitespace-pre-line text-white'>
              {dict.auth.login.requiredMessage}
            </h2>
          </div> */}
          <div className='flex flex-col items-center space-y-4'>
            <button
              onClick={handleLogin}
              className='bg-primary hover:bg-primary/80 w-full rounded-xl px-8 py-4 text-center font-medium text-white transition-colors'
            >
              {dict.auth.login.loginButton}
            </button>
            <button
              onClick={handleSignup}
              className='text-sm font-normal text-neutral-500 transition-colors hover:text-neutral-700'
            >
              {dict.auth.login.signupButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LoginSocialSectionV2 } from 'features/auth-login-social';
import { LoginEmailLinksV2 } from 'features/auth-login-email-links';
import { LoginPageHeader } from './LoginPageHeader';

interface LoginContentV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function LoginContentV2({ lang, dict, redirectTo }: LoginContentV2Props) {
  const isThai = lang === 'th';
  const imageSrc = isThai ? '/images/premium/premium_th.png' : '/images/premium/premium_en.png';
  const imageWidth = isThai ? 284 : 312;
  const imageHeight = 269;
  const [recentMethod, setRecentMethod] = useState<'google' | 'apple' | 'email' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('kdoc_recent_login_method') as
      | 'google'
      | 'apple'
      | 'email'
      | null;
    if (stored === 'google' || stored === 'apple' || stored === 'email') {
      setRecentMethod(stored);
    }
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      <LoginPageHeader />
      {/* 프리미엄 이미지 영역 */}
      <div className={isThai ? 'w-[284px]' : 'w-[312px]'}>
        <Image
          src={imageSrc}
          alt='K-DOC Premium'
          width={imageWidth}
          height={imageHeight}
          priority
          className='h-auto w-full'
        />
      </div>
      <div className='h-10' />
      {/* 소셜 로그인 버튼 섹션 */}
      <LoginSocialSectionV2 lang={lang} dict={dict} redirectTo={redirectTo} />

      {/* 이메일로 시작 / 이메일로 가입 링크 영역 */}
      {recentMethod !== 'email' ? (
        <LoginEmailLinksV2 lang={lang} dict={dict} redirectTo={redirectTo} />
      ) : null}
    </div>
  );
}

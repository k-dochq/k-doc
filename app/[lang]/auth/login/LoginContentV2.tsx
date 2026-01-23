'use client';

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
  const imageConfigByLocale: Record<Locale, { src: string; width: number; height: number }> = {
    en: { src: '/images/premium/premium_en.png', width: 312, height: 269 },
    ko: { src: '/images/premium/premium_en.png', width: 312, height: 269 },
    th: { src: '/images/premium/premium_th.png', width: 284, height: 269 },
    'zh-Hant': { src: '/images/premium/premium_zh.png', width: 312, height: 269 },
    ja: { src: '/images/premium/premium_ja.png', width: 312, height: 269 },
    hi: { src: '/images/premium/premium_hi.png', width: 312, height: 269 },
    tl: { src: '/images/premium/premium_en.png', width: 312, height: 269 },
  };

  const imageConfig = imageConfigByLocale[lang];

  return (
    <div className='flex min-h-screen flex-col items-center bg-white'>
      <LoginPageHeader />
      {/* 프리미엄 이미지 영역 */}
      <div className={lang === 'th' ? 'w-[284px]' : 'w-[312px]'}>
        <Image
          src={imageConfig.src}
          alt='K-DOC Premium'
          width={imageConfig.width}
          height={imageConfig.height}
          priority
          className='h-auto w-full'
        />
      </div>
      <div className='h-10' />
      {/* 소셜 로그인 버튼 섹션 */}
      <LoginSocialSectionV2 lang={lang} dict={dict} redirectTo={redirectTo} />

      {/* 이메일로 시작 / 이메일로 가입 링크 영역 */}
      <LoginEmailLinksV2 lang={lang} dict={dict} redirectTo={redirectTo} />
    </div>
  );
}

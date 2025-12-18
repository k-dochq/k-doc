'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { AppleSignInButtonV2 } from 'features/apple-auth';
import { GoogleSignInButtonV2 } from 'features/google-auth';
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
      <div className='flex w-full flex-col gap-3 px-4'>
        <GoogleSignInButtonV2 lang={lang} dict={dict} redirectTo={redirectTo} />
        <AppleSignInButtonV2 lang={lang} dict={dict} redirectTo={redirectTo} />
      </div>
    </div>
  );
}

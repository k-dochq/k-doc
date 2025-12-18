'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { AppleSignInButton } from 'features/apple-auth';
import { EmailSignInButton } from 'features/email-auth';
import { GoogleSignInButton } from '@/features/google-auth';
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
    </div>
  );
}

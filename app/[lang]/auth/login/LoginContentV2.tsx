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
  const startIn3SecondsText = dict.auth?.login?.startIn3Seconds ?? '3초만에 시작하기';

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

        <div className='flex w-full flex-col items-center'>
          <AppleSignInButtonV2 lang={lang} dict={dict} redirectTo={redirectTo} />

          {/* 3초만에 시작하기 말풍선 */}
          <div className='mt-2 flex justify-center'>
            <div className='animate-float relative inline-flex min-h-[44px] min-w-[117px] items-center justify-center px-4 py-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='117'
                height='44'
                viewBox='0 0 117 44'
                fill='none'
                className='absolute inset-0 h-full w-full'
                preserveAspectRatio='none'
              >
                <path
                  d='M54 7.11316H8C3.58172 7.11316 3.22139e-08 10.6949 0 15.1132V35.1132C0 39.5314 3.58172 43.1132 8 43.1132H109C113.418 43.1132 117 39.5314 117 35.1132V15.1132C117 10.6949 113.418 7.11316 109 7.11316H64L59.8477 0.469604C59.4559 -0.156521 58.5441 -0.156521 58.1523 0.469604L54 7.11316Z'
                  fill='url(#paint0_linear_1608_30045)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_1608_30045'
                    x1='0'
                    y1='21.5566'
                    x2='117'
                    y2='21.5566'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#3E57E2' />
                    <stop offset='0.4' stopColor='#B133FF' />
                    <stop offset='1' stopColor='#FF5DCA' />
                  </linearGradient>
                </defs>
              </svg>
              <div className='pointer-events-none relative flex items-center justify-center'>
                <span className='pt-[3px] text-sm leading-[16px] font-semibold text-white'>
                  {startIn3SecondsText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

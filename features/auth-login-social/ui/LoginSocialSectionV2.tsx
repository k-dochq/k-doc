'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { AppleSignInButtonV2 } from 'features/apple-auth';
import { GoogleSignInButtonV2 } from 'features/google-auth';
import { StartBubbleKo } from './icons/StartBubbleKo';
import { StartBubbleEn } from './icons/StartBubbleEn';
import { StartBubbleTh } from './icons/StartBubbleTh';
import { StartBubbleZh } from './icons/StartBubbleZh';
import { StartBubbleJa } from './icons/StartBubbleJa';
import { StartBubbleHi } from './icons/StartBubbleHi';
import { StartBubbleAr } from './icons/StartBubbleAr';
import { StartBubbleRu } from './icons/StartBubbleRu';

interface LoginSocialSectionV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function LoginSocialSectionV2({ lang, dict, redirectTo }: LoginSocialSectionV2Props) {
  return (
    <div className='flex w-full flex-col gap-3 px-4'>
      <div className='w-full'>
        <GoogleSignInButtonV2 lang={lang} dict={dict} redirectTo={redirectTo} />
      </div>

      <div className='flex w-full flex-col items-center'>
        <div className='w-full'>
          <AppleSignInButtonV2 lang={lang} dict={dict} redirectTo={redirectTo} />
        </div>

        {/* 3초만에 시작하기 말풍선 */}
        <div className='flex justify-center'>
          <div className='animate-float relative inline-flex items-center justify-center px-4 py-2'>
            {lang === 'ko' && <StartBubbleKo />}
            {lang === 'en' && <StartBubbleEn />}
            {lang === 'th' && <StartBubbleTh />}
            {lang === 'zh-Hant' && <StartBubbleZh />}
            {lang === 'ja' && <StartBubbleJa />}
            {lang === 'tl' && <StartBubbleEn />}
            {lang === 'hi' && <StartBubbleHi />}
            {lang === 'ar' && <StartBubbleAr />}
            {lang === 'ru' && <StartBubbleRu />}
          </div>
        </div>
      </div>
    </div>
  );
}

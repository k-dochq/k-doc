'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
// import { GoogleSignInButton } from 'features/google-auth';
import { AppleSignInButton } from 'features/apple-auth';
// import { KakaoSignInButton } from 'features/kakao-auth/ui/KakaoSignInButton';
import { EmailSignInButton } from 'features/email-auth';
import { PageHeader } from 'shared/ui/page-header';
import { GoogleSignInButton } from '@/features/google-auth';
// import { isExpoWebViewOnIOS } from 'shared/lib/webview-detection';

interface LoginContentProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function LoginContent({ lang, dict, redirectTo }: LoginContentProps) {
  // th인 경우 en으로 처리
  const imageLang = lang === 'th' ? 'en' : lang;
  // const isIOSWebView = isExpoWebViewOnIOS();

  return (
    <div
      className='flex h-screen w-full flex-col'
      style={{
        backgroundImage: `url(/images/splash/splash_${imageLang}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* PageHeader */}
      <PageHeader
        lang={lang}
        title=''
        fallbackUrl={`/${lang}`}
        variant='dark'
        bgClassName='bg-white/0'
      />
      <div className='pt-b mt-auto px-5 pb-40'>
        <EmailSignInButton lang={lang} dict={dict} redirectTo={redirectTo} />
        <div className='h-4' />

        {/* <GoogleSignInButton lang={lang} dict={dict} redirectTo={redirectTo} />
        <div className='h-4' /> */}

        <AppleSignInButton lang={lang} dict={dict} redirectTo={redirectTo} />
      </div>
    </div>
  );
}

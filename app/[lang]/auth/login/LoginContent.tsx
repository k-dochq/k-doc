import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { GoogleSignInButton } from 'features';
// import { KakaoSignInButton } from 'features/kakao-auth/ui/KakaoSignInButton';
import { EmailSignInButton } from 'features/email-auth';
import Image from 'next/image';
import { HeaderLogo } from '@/widgets/header/ui/HeaderLogo';

interface LoginContentProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export async function LoginContent({ lang, dict, redirectTo }: LoginContentProps) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden px-5'>
      {/* 배경 이미지 */}
      <div className='absolute inset-0'>
        <Image
          src='/images/shared/splash.png'
          alt='Background'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* 컨텐츠 */}
      <div className='relative z-10 flex min-h-screen flex-col'>
        {/* 하단 로그인 버튼 영역 */}
        <div className='mt-auto pb-5'>
          <div className='space-y-3'>
            <GoogleSignInButton locale={lang} dict={dict} redirectTo={redirectTo} />
            {/* <KakaoSignInButton locale={lang} dict={dict} /> */}
            <EmailSignInButton lang={lang} dict={dict} />
            {/* 하단 로고 */}
            <div className='flex w-full justify-center text-white'>
              <HeaderLogo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

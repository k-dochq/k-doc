import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
// import { GoogleSignInButton } from 'features';
// import { KakaoSignInButton } from 'features/kakao-auth/ui/KakaoSignInButton';
import { EmailSignInButton } from 'features/email-auth';
import { PageHeader } from 'shared/ui/page-header';

interface LoginContentProps {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export async function LoginContent({ lang, dict, redirectTo }: LoginContentProps) {
  // th인 경우 en으로 처리
  const imageLang = lang === 'th' ? 'en' : lang;

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
      <div className='pt-b mt-auto px-5 pb-20'>
        <EmailSignInButton lang={lang} dict={dict} redirectTo={redirectTo} />
      </div>
    </div>
  );
}

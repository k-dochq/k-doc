import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { GoogleSignInButton } from 'features/google-auth';
import { KakaoSignInButton } from 'features/kakao-auth/ui/KakaoSignInButton';

interface SocialLoginSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function SocialLoginSection({ lang, dict }: SocialLoginSectionProps) {
  return (
    <div className='space-y-3'>
      <GoogleSignInButton locale={lang} dict={dict} />
      <KakaoSignInButton locale={lang} dict={dict} />
    </div>
  );
}

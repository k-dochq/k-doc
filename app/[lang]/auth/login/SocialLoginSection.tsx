import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { GoogleSignInButton } from 'features';

interface SocialLoginSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export function SocialLoginSection({ lang, dict }: SocialLoginSectionProps) {
  return (
    <div className='space-y-3'>
      <GoogleSignInButton locale={lang} dict={dict} />
      {/* 카카오 로그인 버튼 임시 숨김 */}
      {/* <KakaoSignInButton locale={lang} dict={dict} /> */}
    </div>
  );
}

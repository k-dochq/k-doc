import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SocialLoginSection } from './SocialLoginSection';

interface LoginContentProps {
  lang: Locale;
  dict: Dictionary;
}

export async function LoginContent({ lang, dict }: LoginContentProps) {
  return (
    <div className='space-y-6'>
      {/* 소셜 로그인 섹션 */}
      <SocialLoginSection lang={lang} dict={dict} />
    </div>
  );
}

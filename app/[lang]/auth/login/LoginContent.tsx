import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { EmailLoginForm } from './EmailLoginForm';
import { SocialLoginSection } from './SocialLoginSection';

interface LoginContentProps {
  lang: Locale;
  dict: Dictionary;
}

export async function LoginContent({ lang, dict }: LoginContentProps) {
  return (
    <div className='space-y-6'>
      {/* 이메일 로그인 폼 */}
      <EmailLoginForm lang={lang} dict={dict} />

      {/* 구분선 */}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-2 text-gray-500'>
            {dict.auth?.login?.socialLogin || '소셜 로그인'}
          </span>
        </div>
      </div>

      {/* 소셜 로그인 섹션 */}
      <SocialLoginSection lang={lang} dict={dict} />
    </div>
  );
}

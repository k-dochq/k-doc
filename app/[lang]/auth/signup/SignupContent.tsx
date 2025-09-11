import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SignupForm } from './SignupForm';

interface SignupContentProps {
  lang: Locale;
  dict: Dictionary;
}

export async function SignupContent({ lang, dict }: SignupContentProps) {
  return (
    <div className='space-y-6'>
      {/* 회원가입 폼 */}
      <SignupForm lang={lang} dict={dict} />
    </div>
  );
}

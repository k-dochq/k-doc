import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { PageHeader } from 'shared/ui/page-header';
import { SignupForm } from 'features/email-auth';
import { AuthLoginLink } from 'features/auth-login-link';
import { HeaderLanguageSwitcher } from 'widgets/header/ui/HeaderLanguageSwitcher';

interface SignupPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

export default async function SignupPage({ params, searchParams }: SignupPageProps) {
  const { lang } = await params;
  const { redirectTo } = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen'>
      <PageHeader
        lang={lang}
        title={dict.auth?.signup?.title || '회원가입'}
        fallbackUrl='/auth/login'
        variant='light'
        rightContent={<HeaderLanguageSwitcher currentLang={lang} />}
      />

      {/* 로그인 링크 */}
      <div className='px-5 py-4'>
        <div className='mx-auto max-w-md'>
          <AuthLoginLink lang={lang} dict={dict} redirectTo={redirectTo} />
        </div>
      </div>

      <div className='px-5 py-6'>
        <div className='mx-auto max-w-md'>
          <SignupForm lang={lang} dict={dict} redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}

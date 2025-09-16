import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { PageHeader } from 'shared/ui/page-header';
import { EmailLoginForm } from 'features/email-auth';

interface EmailLoginPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

export default async function EmailLoginPage({ params, searchParams }: EmailLoginPageProps) {
  const { lang } = await params;
  const { redirectTo } = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <PageHeader
        lang={lang}
        title={dict.auth?.login?.emailLogin || '이메일로 로그인'}
        fallbackUrl='/auth/login'
        variant='light'
      />

      <div className='px-5 py-6'>
        <div className='mx-auto max-w-md'>
          <EmailLoginForm lang={lang} dict={dict} redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}

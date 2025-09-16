import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { SignupContent } from './SignupContent';
import { PageHeader } from 'shared/ui/page-header';

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
    <div className=''>
      <PageHeader
        lang={lang}
        title={dict.auth?.signup?.title || '회원가입'}
        fallbackUrl='/auth/login'
        variant='light'
      />
    </div>
  );
}

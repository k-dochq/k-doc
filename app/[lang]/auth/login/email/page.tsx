import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { LoginEmailContentV2 } from './LoginEmailContentV2';

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

  return <LoginEmailContentV2 lang={lang} dict={dict} redirectTo={redirectTo} />;
}

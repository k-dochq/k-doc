import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { SignUpContentV2 } from './SignUpContentV2';

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

  return <SignUpContentV2 lang={lang} dict={dict} redirectTo={redirectTo} />;
}

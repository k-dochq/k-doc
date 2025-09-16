import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { ForgotPasswordContent } from './ForgotPasswordContent';

interface ForgotPasswordPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

export default async function ForgotPasswordPage({
  params,
  searchParams,
}: ForgotPasswordPageProps) {
  const { lang } = await params;
  const { redirectTo } = await searchParams;
  const dict = await getDictionary(lang);

  return <ForgotPasswordContent lang={lang} dict={dict} redirectTo={redirectTo} />;
}

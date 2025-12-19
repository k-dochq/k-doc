import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { ForgotPasswordContentV2 } from './ForgotPasswordContentV2';

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

  return <ForgotPasswordContentV2 lang={lang} dict={dict} redirectTo={redirectTo} />;
}

import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { ResetPasswordContent } from './ResetPasswordContent';

interface ResetPasswordPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    token_hash?: string;
    type?: string;
  }>;
}

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
  const { lang } = await params;
  const { token_hash, type } = await searchParams;
  const dict = await getDictionary(lang);

  return <ResetPasswordContent lang={lang} dict={dict} tokenHash={token_hash} type={type} />;
}

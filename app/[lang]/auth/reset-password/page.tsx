import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { ResetPasswordContent } from './ResetPasswordContent';

interface ResetPasswordPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    access_token?: string;
    refresh_token?: string;
    type?: string;
  }>;
}

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
  const { lang } = await params;
  const { access_token, refresh_token, type } = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <ResetPasswordContent
      lang={lang}
      dict={dict}
      accessToken={access_token}
      refreshToken={refresh_token}
      type={type}
    />
  );
}

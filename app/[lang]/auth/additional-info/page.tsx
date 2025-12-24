import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { AdditionalInfoContentV2 } from './AdditionalInfoContentV2';
import { AuthService } from 'shared/lib/auth/server';
import { redirect } from 'next/navigation';

interface AdditionalInfoPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

export default async function AdditionalInfoPage({
  params,
  searchParams,
}: AdditionalInfoPageProps) {
  const { lang } = await params;
  const { redirectTo } = await searchParams;
  const dict = await getDictionary(lang);

  // 사용자 인증 확인
  const authService = new AuthService();
  let userEmail = '';
  let provider: string | undefined;

  try {
    const user = await authService.getCurrentUser();
    userEmail = user.email || '';
    provider = user.app_metadata?.provider as string | undefined;

    // 이메일이 없으면 로그인 페이지로 리다이렉트
    if (!userEmail) {
      redirect(`/${lang}/auth/login`);
    }
  } catch (_error) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    redirect(`/${lang}/auth/login`);
  }

  return (
    <AdditionalInfoContentV2
      lang={lang}
      dict={dict}
      userEmail={userEmail}
      redirectTo={redirectTo}
      provider={provider}
    />
  );
}

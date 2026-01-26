import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { LoginContentV2 } from './LoginContentV2';

interface LoginPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { lang } = await params;
  const { redirect } = await searchParams;
  const dict = await getDictionary(lang);

  return <LoginContentV2 lang={lang} dict={dict} redirectTo={redirect} />;
}

// 메타데이터 생성
export async function generateMetadata({ params }: LoginPageProps) {
  const { lang } = await params;

  try {
    const dict = await getDictionary(lang);

    return {
      title: `${dict.auth?.login?.title || 'Login'} - K-DOC`,
      description: dict.auth?.login?.subtitle || 'Login to your account',
    };
  } catch (error) {
    console.error('Error generating metadata for login page:', error);
    return {
      title: 'Login - K-DOC',
      description: 'Login to your account',
    };
  }
}

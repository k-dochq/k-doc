import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { LoginContent } from './LoginContent';

interface LoginPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { lang } = await params;
  const { redirect } = await searchParams;
  const dict = await getDictionary(lang);

  return <LoginContent lang={lang} dict={dict} redirectTo={redirect} />;
}

// 메타데이터 생성
export async function generateMetadata({ params }: LoginPageProps) {
  const { lang } = await params;

  try {
    const dict = await getDictionary(lang);

    return {
      title: `${dict.auth?.login?.title || '로그인'} - K-DOC`,
      description: dict.auth?.login?.subtitle || '계정에 로그인하세요',
    };
  } catch (error) {
    console.error('Error generating metadata for login page:', error);
    return {
      title: '로그인 - K-DOC',
      description: '계정에 로그인하세요',
    };
  }
}

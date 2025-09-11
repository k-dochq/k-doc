import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { LoginContent } from './LoginContent';
import { LoginSkeleton } from './LoginSkeleton';

interface LoginPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { lang } = await params;
  const { redirect } = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        {/* 헤더 - 즉시 표시 */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>K-DOC</h1>
          <h2 className='mt-6 text-2xl font-bold text-gray-900'>
            {dict.auth?.login?.title || '로그인'}
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            {dict.auth?.login?.subtitle || '계정에 로그인하세요'}
          </p>
        </div>

        {/* 로그인 폼 - Suspense로 스트리밍 */}
        <Suspense fallback={<LoginSkeleton />}>
          <LoginContent lang={lang} dict={dict} redirectTo={redirect} />
        </Suspense>
      </div>
    </div>
  );
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

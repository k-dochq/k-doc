import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { PageHeader } from 'shared/ui/page-header';
import { AdditionalInfoForm } from 'features/social-auth';
import { HeaderLanguageSwitcher } from 'widgets/header/ui/HeaderLanguageSwitcher';
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

  try {
    const user = await authService.getCurrentUser();
    userEmail = user.email || '';

    // 이메일이 없으면 로그인 페이지로 리다이렉트
    if (!userEmail) {
      redirect(`/${lang}/auth/login`);
    }
  } catch (error) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    redirect(`/${lang}/auth/login`);
  }

  return (
    <div className='min-h-screen'>
      <PageHeader
        lang={lang}
        title={dict.auth?.additionalInfo?.title || 'Additional Information'}
        fallbackUrl={`/${lang}/main`}
        variant='light'
        rightContent={<HeaderLanguageSwitcher currentLang={lang} />}
      />

      <div className='px-5 py-6'>
        <div className='mx-auto max-w-md'>
          {/* 안내 메시지 */}
          <div className='mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4'>
            <p className='text-sm text-blue-800'>
              {dict.auth?.additionalInfo?.description ||
                'Please provide additional information to use our service.'}
            </p>
          </div>

          <AdditionalInfoForm
            lang={lang}
            dict={dict}
            userEmail={userEmail}
            redirectTo={redirectTo}
          />
        </div>
      </div>
    </div>
  );
}

import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { SignupContent } from './SignupContent';

interface SignupPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function SignupPage({ params }: SignupPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900'>
            {dict.auth?.signup?.title || '회원가입'}
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            {dict.auth?.signup?.subtitle || '새 계정을 만드세요'}
          </p>
        </div>
        <div className='rounded-lg bg-white px-8 py-8 shadow-md'>
          <SignupContent lang={lang} dict={dict} />
        </div>
      </div>
    </div>
  );
}

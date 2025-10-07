import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { LocaleLink } from 'shared/ui/locale-link';

interface AuthCodeErrorPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AuthCodeErrorPage({ params, searchParams }: AuthCodeErrorPageProps) {
  const { lang } = await params;
  const _dict = await getDictionary(lang);
  const resolvedSearchParams = (await searchParams) || {};
  const entries = Object.entries(resolvedSearchParams);

  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>K-DOC</h1>
          <div className='mt-6'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
              <svg
                className='h-6 w-6 text-red-600'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                />
              </svg>
            </div>
            <h2 className='mt-4 text-2xl font-bold text-gray-900'>
              {_dict.auth?.error?.title || 'Authentication Error'}
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              {_dict.auth?.error?.description ||
                'An error occurred during authentication. Please try again.'}
            </p>
          </div>
        </div>

        {/* Query Parameters */}
        {entries.length > 0 && (
          <div className='rounded-md border border-gray-200 bg-white p-4'>
            <h3 className='mb-2 text-sm font-medium text-gray-900'>Query Parameters</h3>
            <ul className='space-y-1'>
              {entries.map(([key, value]) => (
                <li key={key} className='text-sm break-all text-gray-700'>
                  <span className='font-semibold'>{key}:</span>{' '}
                  <span>{Array.isArray(value) ? value.join(', ') : String(value ?? '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='space-y-4'>
          <LocaleLink
            href='/auth/login'
            className='flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            {_dict.auth?.error?.tryAgain || 'Try Again'}
          </LocaleLink>

          <LocaleLink
            href='/'
            className='flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            {_dict.auth?.error?.goHome || 'Go Home'}
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}

// 메타데이터 생성
export async function generateMetadata({ params }: AuthCodeErrorPageProps) {
  const { lang } = await params;

  try {
    const _dict = await getDictionary(lang);

    return {
      title: `${_dict.auth?.error?.title || 'Authentication Error'} - K-DOC`,
      description: _dict.auth?.error?.description || 'An error occurred during authentication.',
    };
  } catch (error) {
    console.error('Error generating metadata for auth error page:', error);
    return {
      title: 'Authentication Error - K-DOC',
      description: 'An error occurred during authentication.',
    };
  }
}

import { PageHeader } from '@/shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface DoctorDetailErrorProps {
  lang: Locale;
  dict: Dictionary;
  error?: Error;
}

export function DoctorDetailError({ lang, dict: _dict, error }: DoctorDetailErrorProps) {
  return (
    <div>
      <PageHeader lang={lang} title='' variant='light' />
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700'>오류가 발생했습니다</h2>
          {error && <p className='text-gray-500'>{error.message}</p>}
        </div>
      </div>
    </div>
  );
}

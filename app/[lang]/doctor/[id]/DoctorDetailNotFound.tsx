import { PageHeader } from '@/shared/ui/page-header';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface DoctorDetailNotFoundProps {
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailNotFound({ lang, dict }: DoctorDetailNotFoundProps) {
  return (
    <div>
      <PageHeader lang={lang} title='' variant='light' />
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h2 className='mb-4 text-xl font-semibold text-gray-700'>의사를 찾을 수 없습니다</h2>
          <p className='text-gray-500'>요청하신 의사 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    </div>
  );
}

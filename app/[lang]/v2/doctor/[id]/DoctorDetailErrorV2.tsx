import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface DoctorDetailErrorV2Props {
  lang: Locale;
  dict: Dictionary;
  error?: Error;
}

export function DoctorDetailErrorV2({ lang, dict: _dict, error }: DoctorDetailErrorV2Props) {
  return (
    <div className='min-h-screen bg-white text-neutral-900'>
      <PageHeaderV2
        title=''
        fallbackUrl={`/${lang}/v2/doctors`}
        enableScrollTransparency={false}
        rightContent={null}
      />
      <div className='flex min-h-[60vh] items-center justify-center px-6'>
        <div className='text-center'>
          <h2 className='mb-3 text-lg font-semibold text-neutral-700'>오류가 발생했습니다</h2>
          {error && <p className='text-sm text-neutral-500'>{error.message}</p>}
        </div>
      </div>
    </div>
  );
}

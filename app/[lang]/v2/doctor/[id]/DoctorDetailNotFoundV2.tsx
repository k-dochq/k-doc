import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface DoctorDetailNotFoundV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function DoctorDetailNotFoundV2({ lang, dict: _dict }: DoctorDetailNotFoundV2Props) {
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
          <h2 className='mb-3 text-lg font-semibold text-neutral-700'>의사를 찾을 수 없습니다</h2>
          <p className='text-sm text-neutral-500'>요청하신 의사 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    </div>
  );
}

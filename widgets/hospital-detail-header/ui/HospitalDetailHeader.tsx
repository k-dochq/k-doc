import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { BackButton } from 'shared/ui/button';

interface HospitalDetailHeaderProps {
  lang: Locale;
  dict: Dictionary;
  hospitalName?: string;
}

export function HospitalDetailHeader({ lang, dict, hospitalName }: HospitalDetailHeaderProps) {
  return (
    <div className='flex w-full items-center px-5 py-4 text-white'>
      <div className='flex items-center gap-1'>
        {/* 뒤로가기 버튼 */}
        <BackButton fallbackUrl={`/${lang}/hospitals`} />
        {/* 병원명 (선택적) */}
        {hospitalName && <h1 className='text-lg font-semibold'>{hospitalName}</h1>}
      </div>
    </div>
  );
}

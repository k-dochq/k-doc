import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { BackButton } from 'shared/ui/button';
import { LikeButtonWrapper } from 'features/hospital-like';

interface HospitalDetailHeaderProps {
  lang: Locale;
  dict: Dictionary;
  hospitalId: string;
  hospitalName?: string;
}

export function HospitalDetailHeader({
  lang,
  dict,
  hospitalId,
  hospitalName,
}: HospitalDetailHeaderProps) {
  return (
    <div className='flex w-full items-center justify-between px-5 py-4 text-white'>
      <div className='flex items-center gap-1'>
        {/* 뒤로가기 버튼 */}
        <BackButton fallbackUrl={`/${lang}/hospitals`} />
        {/* 병원명 (선택적) */}
        {hospitalName && <h1 className='text-lg font-semibold'>{hospitalName}</h1>}
      </div>

      {/* 좋아요 버튼 래퍼 */}
      <LikeButtonWrapper hospitalId={hospitalId} />
    </div>
  );
}

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HospitalDetailProceduresTabProps {
  hospital: any; // TODO: 정확한 타입 정의 필요
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 시술상세 탭 컨텐츠 컴포넌트
 * TODO: 시술상세 관련 컨텐츠 구현 필요
 */
export function HospitalDetailProceduresTab({
  hospital,
  hospitalId,
  lang,
  dict,
}: HospitalDetailProceduresTabProps) {
  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <div className='text-base text-white/70'>{dict.hospitalDetailTabs.proceduresComingSoon}</div>
      <div className='mt-2 text-sm text-white/50'>{dict.hospitalDetailTabs.comingSoonSubtext}</div>
    </div>
  );
}

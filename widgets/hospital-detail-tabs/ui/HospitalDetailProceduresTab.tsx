import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ApgujeongMiracleProcedures } from 'features/hospital-detail-procedures';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { APGUJEONG_MIRACLE_HOSPITAL_ID } from 'shared/config/hospital-constants';

interface HospitalDetailProceduresTabProps {
  hospital: Hospital;
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 시술상세 탭 컨텐츠 컴포넌트.
 * 압구정 미라클 의원의 경우 특별한 시술상세 컨텐츠를 보여줍니다.
 */
export function HospitalDetailProceduresTab({
  hospital,
  hospitalId,
  lang,
  dict,
}: HospitalDetailProceduresTabProps) {
  // 압구정 미라클 의원인지 확인
  const isApgujeongMiracle = hospitalId === APGUJEONG_MIRACLE_HOSPITAL_ID;

  if (isApgujeongMiracle) {
    return <ApgujeongMiracleProcedures hospital={hospital} lang={lang} dict={dict} />;
  }

  // 일반 병원의 경우 준비중 메시지
  return (
    <div className='flex min-h-[200px] flex-col items-center justify-center text-center'>
      <div className='text-base font-medium text-neutral-700'>
        {dict.hospitalDetailTabs.proceduresComingSoon}
      </div>
      <div className='mt-2 text-sm text-neutral-500'>{dict.hospitalDetailTabs.comingSoonSubtext}</div>
    </div>
  );
}

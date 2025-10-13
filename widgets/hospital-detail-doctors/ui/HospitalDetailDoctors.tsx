import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';
import { DoctorCard } from './DoctorCard';

interface HospitalDetailDoctorsProps {
  lang: Locale;
  dict: Dictionary;
  doctors: HospitalDoctor[];
}

/**
 * 병원 소속 의료진 섹션 컴포넌트
 */
export function HospitalDetailDoctors({ lang, dict, doctors }: HospitalDetailDoctorsProps) {
  const doctorCount = doctors.length;

  return (
    <div className=''>
      {/* 섹션 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <h2 className='text-base leading-6 font-bold'>
            {dict.hospitals?.doctors?.title || '소속 의료진'}
          </h2>
          <span className='text-sm leading-[18px] font-semibold'>({doctorCount})</span>
        </div>
      </div>

      {/* 의료진 목록 */}
      <div className='mt-4 space-y-3'>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} lang={lang} dict={dict} />
        ))}
      </div>
    </div>
  );
}

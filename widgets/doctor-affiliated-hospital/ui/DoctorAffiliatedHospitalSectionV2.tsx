'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type DoctorDetail } from '@/lib/queries/doctor';
import { transformDoctorHospitalToHospitalCard } from '@/lib/utils/doctor-hospital-transform';
import { DoctorAffiliatedHospitalCardV2 } from './DoctorAffiliatedHospitalCardV2';

interface DoctorAffiliatedHospitalSectionV2Props {
  doctor: DoctorDetail;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorAffiliatedHospitalSectionV2({
  doctor,
  lang,
  dict,
}: DoctorAffiliatedHospitalSectionV2Props) {
  // doctor.hospital 데이터를 HospitalCardData 형태로 변환
  const hospitalCardData = transformDoctorHospitalToHospitalCard(doctor);

  if (!hospitalCardData) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3 p-5'>
      <h3 className='text-[18px] leading-[28px] font-semibold text-neutral-700'>
        {dict.doctor.affiliatedHospital}
      </h3>
      <DoctorAffiliatedHospitalCardV2 hospital={hospitalCardData} lang={lang} dict={dict} />
    </div>
  );
}

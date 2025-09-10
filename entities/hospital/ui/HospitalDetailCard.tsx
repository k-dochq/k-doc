import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Hospital } from '../api/entities/types';
import { type OpeningHours } from '../api/entities/opening-hours-types';
import { HospitalMainImage } from './HospitalMainImage';
import { HospitalBasicInfo } from './HospitalBasicInfo';
import { HospitalSpecialties } from './HospitalSpecialties';
import { HospitalDescription } from './HospitalDescription';
import { HospitalOperatingHours } from './HospitalOperatingHours';
import { HospitalInteriorGallery } from './HospitalInteriorGallery';
import { HospitalStats } from './HospitalStats';
import { HospitalDoctors } from './HospitalDoctors';

interface HospitalDetailCardProps {
  hospital: Hospital & {
    description?: string;
    openingHours?: OpeningHours;
  };
  lang: Locale;
  dict: Record<string, any>; // 사전 타입도 개선
}

export function HospitalDetailCard({ hospital, lang, dict }: HospitalDetailCardProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원명 없음';

  return (
    <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
      {/* 메인 이미지 */}
      <HospitalMainImage imageUrl={hospital.mainImageUrl} hospitalName={hospitalName} />

      {/* 병원 정보 */}
      <div className='space-y-6 p-6'>
        {/* 기본 정보 (이름, 평점, 주소) */}
        <HospitalBasicInfo hospital={hospital} lang={lang} />

        {/* 진료 부위 태그 */}
        <HospitalSpecialties medicalSpecialties={hospital.medicalSpecialties} lang={lang} />

        {/* 병원 소개 */}
        <HospitalDescription description={hospital.description} />

        {/* 운영시간 */}
        <HospitalOperatingHours openingHours={hospital.openingHours} lang={lang} />

        {/* 소속의료진 */}
        <HospitalDoctors doctors={hospital.doctors || []} lang={lang} dict={dict} />

        {/* 병원 내부 이미지 */}
        <HospitalInteriorGallery
          images={hospital.hospitalImages || []}
          hospitalName={hospitalName}
        />

        {/* 통계 정보 */}
        <HospitalStats hospital={hospital} />
      </div>
    </div>
  );
}

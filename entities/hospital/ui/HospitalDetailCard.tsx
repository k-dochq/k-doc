import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from '../api/entities/types';
import { type OpeningHours } from '../api/entities/opening-hours-types';
import { HospitalMainImage } from './HospitalMainImage';

interface HospitalDetailCardProps {
  hospital: Hospital & {
    description?: string;
    openingHours?: OpeningHours;
  };
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailCard({ hospital, lang, dict }: HospitalDetailCardProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원명 없음';

  return (
    <div className='overflow-hidden rounded-lg shadow-lg'>
      {/* 메인 이미지 */}
      <HospitalMainImage imageUrl={hospital.mainImageUrl} hospitalName={hospitalName} />
    </div>
  );
}

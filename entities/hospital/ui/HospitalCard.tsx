import { type HospitalCardData } from 'shared/model/types';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalThumbnail } from './HospitalThumbnail';
import { HospitalInfo } from './HospitalInfo';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';

interface HospitalCardProps {
  hospital: HospitalCardData;
  dict: Dictionary;
  lang: Locale;
}

export function HospitalCard({ hospital, dict, lang }: HospitalCardProps) {
  return (
    <div className='flex min-w-0 gap-3'>
      <HospitalThumbnail imageUrl={hospital.thumbnailImageUrl} />
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <HospitalInfo
          name={hospital.name}
          address={hospital.address}
          prices={hospital.prices}
          rating={hospital.rating}
          reviewCount={hospital.reviewCount}
          discountRate={hospital.discountRate}
          dict={dict}
          lang={lang}
        />
        {/* 시술부위 태그 */}
        {hospital.medicalSpecialties && hospital.medicalSpecialties.length > 0 && (
          <MedicalSpecialtyTags
            specialties={hospital.medicalSpecialties}
            lang={lang}
            maxDisplay={3}
            className='mt-1'
          />
        )}
      </div>
    </div>
  );
}

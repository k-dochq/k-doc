import { type BestHospital } from 'shared/model/types/common';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalThumbnail } from './HospitalThumbnail';
import { HospitalInfo } from './HospitalInfo';

interface HospitalCardProps {
  hospital: BestHospital;
  dict: Dictionary;
  lang: Locale;
}

export function HospitalCard({ hospital, dict, lang }: HospitalCardProps) {
  return (
    <div className='flex gap-3'>
      <HospitalThumbnail imageUrl={hospital.thumbnailImageUrl} />
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
    </div>
  );
}

import { type HospitalCardData } from 'shared/model/types';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalThumbnail } from './HospitalThumbnail';
import { HospitalInfo } from './HospitalInfo';

interface HospitalCardProps {
  hospital: HospitalCardData;
  dict: Dictionary;
  lang: Locale;
}

export function HospitalCard({ hospital, dict, lang }: HospitalCardProps) {
  return (
    <div className='flex min-w-0 gap-3'>
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

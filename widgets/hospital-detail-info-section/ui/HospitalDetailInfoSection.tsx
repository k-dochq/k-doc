import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { formatOperatingHours } from 'shared/lib';

interface HospitalDetailInfoSectionProps {
  hospital: Hospital & { openingHours?: OpeningHours };
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailInfoSection({
  hospital,
  lang,
  dict,
}: HospitalDetailInfoSectionProps) {
  return (
    <div className=''>
      <h2 className='text-base font-bold'>{dict.hospital.info.title}</h2>
      <div className='mt-4 text-sm leading-relaxed font-normal whitespace-pre-line'>
        {formatOperatingHours(hospital.openingHours, lang)}
      </div>
    </div>
  );
}

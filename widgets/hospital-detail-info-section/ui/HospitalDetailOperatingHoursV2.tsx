import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { OperatingHoursHeaderV2 } from './OperatingHoursHeaderV2';
import { OperatingHoursBodyV2 } from './OperatingHoursBodyV2';

interface HospitalDetailOperatingHoursV2Props {
  openingHours?: OpeningHours;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailOperatingHoursV2({
  openingHours,
  lang,
  dict,
}: HospitalDetailOperatingHoursV2Props) {
  if (!openingHours) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospital.info.operatingHours}
      </h2>

      <div className='overflow-hidden'>
        <OperatingHoursHeaderV2 openingHours={openingHours} lang={lang} />
        <OperatingHoursBodyV2 openingHours={openingHours} lang={lang} />
      </div>
    </div>
  );
}

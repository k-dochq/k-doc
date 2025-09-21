import { type HospitalCardData } from 'shared/model/types';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { HospitalCard } from './HospitalCard';

interface HospitalListProps {
  hospitals: HospitalCardData[];
  dict: Dictionary;
  lang: Locale;
}

export function HospitalList({ hospitals, dict, lang }: HospitalListProps) {
  if (hospitals.length === 0) {
    return <div className='py-8 text-center text-gray-500'>{dict.hospitals.empty.message}</div>;
  }

  return (
    <div className='space-y-3'>
      {hospitals.map((hospital) => (
        <LocaleLink key={hospital.id} href={`/hospital/${hospital.id}`} className='block'>
          <HospitalCard hospital={hospital} dict={dict} lang={lang} />
        </LocaleLink>
      ))}
    </div>
  );
}

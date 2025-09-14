import { type Locale } from 'shared/config';
import { type Hospital } from '../api/entities/types';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailNameProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalDetailName({ hospital, lang }: HospitalDetailNameProps) {
  return <h1 className='text-xl font-bold'>{extractLocalizedText(hospital.name, lang)}</h1>;
}

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailIntroductionProps {
  hospital: Hospital & { description?: string };
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailIntroduction({
  hospital,
  lang,
  dict,
}: HospitalDetailIntroductionProps) {
  const description = hospital.description;

  if (!description) {
    return null;
  }

  return (
    <div className=''>
      <h2 className='text-base font-bold text-white'>{dict.hospital.introduction.title}</h2>
      <p className='mt-4 text-sm leading-relaxed font-normal whitespace-pre-line text-white'>
        {description}
      </p>
    </div>
  );
}

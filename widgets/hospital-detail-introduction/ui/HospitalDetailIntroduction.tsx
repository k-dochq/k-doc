import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailIntroductionProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailIntroduction({
  hospital,
  lang,
  dict,
}: HospitalDetailIntroductionProps) {
  const description = extractLocalizedText(hospital.description, lang);

  if (!description) {
    return null;
  }

  return (
    <div className=''>
      <h2 className='text-base font-bold'>{dict.hospital.introduction.title}</h2>
      <div className='mt-4 rounded-xl border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
        <p className='text-sm font-normal whitespace-pre-line'>{description}</p>
      </div>
    </div>
  );
}

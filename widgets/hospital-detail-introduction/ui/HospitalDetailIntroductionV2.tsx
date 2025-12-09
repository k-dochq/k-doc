import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailIntroductionV2Props {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailIntroductionV2({
  hospital,
  lang,
  dict,
}: HospitalDetailIntroductionV2Props) {
  const description = extractLocalizedText(hospital.description, lang);

  if (!description) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospital.introduction.title}
      </h2>
      <div className='flex flex-col gap-0'>
        <p className='text-sm leading-5 whitespace-pre-wrap text-neutral-500'>{description}</p>
      </div>
    </div>
  );
}

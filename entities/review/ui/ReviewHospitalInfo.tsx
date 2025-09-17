'use client';

import { type LocalizedText } from 'shared/lib/localized-text';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface ReviewHospitalInfoProps {
  districtName: LocalizedText;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function ReviewHospitalInfo({
  districtName,
  lang,
  dict,
  className = '',
}: ReviewHospitalInfoProps) {
  const name = extractLocalizedText(districtName, lang) || '';

  return (
    <div className={`text-xs text-gray-600 ${className}`}>
      <span className='text-xs font-semibold text-neutral-500'>{dict.hospital.region}</span>
      <span className='mx-1 text-neutral-300'>|</span>
      <span className='text-xs font-semibold text-neutral-500'>{name}</span>
    </div>
  );
}

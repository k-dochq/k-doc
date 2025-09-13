'use client';

import { type LocalizedText } from 'shared/lib/localized-text';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface ReviewHospitalInfoProps {
  hospitalName: LocalizedText;
  lang: Locale;
  className?: string;
}

export function ReviewHospitalInfo({
  hospitalName,
  lang,
  className = '',
}: ReviewHospitalInfoProps) {
  const name = extractLocalizedText(hospitalName, lang) || '';

  return (
    <div className={`text-xs text-gray-600 ${className}`}>
      <span className='text-xs font-semibold text-neutral-500'>지역</span>
      <span className='mx-1 text-neutral-300'>|</span>
      <span className='text-xs font-semibold text-neutral-500'>{name}</span>
    </div>
  );
}

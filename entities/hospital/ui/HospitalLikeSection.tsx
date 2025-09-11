'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalLikeButton } from 'features/hospital-like';

interface HospitalLikeSectionProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalLikeSection({ hospitalId, lang, dict }: HospitalLikeSectionProps) {
  return (
    <div className='flex justify-center'>
      <HospitalLikeButton
        hospitalId={hospitalId}
        locale={lang}
        dict={dict}
        size='lg'
        showCount={true}
        className='shadow-sm'
      />
    </div>
  );
}

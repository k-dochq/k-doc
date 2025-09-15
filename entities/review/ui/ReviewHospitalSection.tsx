'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { convertReviewHospitalToHospitalCard } from 'entities/review';
import { HospitalCard } from 'entities/hospital/ui/HospitalCard';
import { LocaleLink } from 'shared/ui/locale-link';

interface ReviewHospitalSectionProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function ReviewHospitalSection({
  review,
  lang,
  dict,
  className = '',
}: ReviewHospitalSectionProps) {
  return (
    <div className={`mt-4 ${className}`}>
      <div className='rounded-xl border border-neutral-200 p-4'>
        <LocaleLink href={`/hospital/${review.hospital.id}`}>
          <HospitalCard
            hospital={convertReviewHospitalToHospitalCard(review)}
            dict={dict}
            lang={lang}
          />
        </LocaleLink>
      </div>
    </div>
  );
}

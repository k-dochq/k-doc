'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface HospitalReviewsContentProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalReviewsContent({ hospitalId, lang, dict }: HospitalReviewsContentProps) {
  return <div></div>;
}

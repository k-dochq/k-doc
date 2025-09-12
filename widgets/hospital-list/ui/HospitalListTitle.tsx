'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SectionTitle } from 'shared/ui';

interface HospitalListTitleProps {
  lang: Locale;
  dict: Dictionary;
  onViewAll?: () => void;
}

export function HospitalListTitle({ lang, dict, onViewAll }: HospitalListTitleProps) {
  return (
    <SectionTitle
      title={dict.hospitalList.title}
      viewAllText={dict.hospitalList.viewAll}
      onViewAll={onViewAll}
      lang={lang}
      dict={dict}
    />
  );
}

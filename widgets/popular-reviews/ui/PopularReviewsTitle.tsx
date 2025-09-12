'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { SectionTitle } from 'shared/ui';

interface PopularReviewsTitleProps {
  lang: Locale;
  dict: Dictionary;
  onViewAll?: () => void;
}

export function PopularReviewsTitle({ lang, dict, onViewAll }: PopularReviewsTitleProps) {
  return (
    <SectionTitle
      title={dict.popularReviews.title}
      viewAllText={dict.popularReviews.viewAll}
      onViewAll={onViewAll}
      lang={lang}
      dict={dict}
    />
  );
}

'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { CategoryFilterTabsV2Wrapper } from 'widgets/hospital-list/ui/CategoryFilterTabsV2Wrapper';
import { LiveReviewTitleV2Main } from './LiveReviewTitleV2Main';
import { LiveReviewCarouselV2Wrapper } from './LiveReviewCarouselV2Wrapper';

interface LiveReviewV2ContainerProps {
  lang: Locale;
  dict: Dictionary;
}

export function LiveReviewV2Container({ lang, dict }: LiveReviewV2ContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  return (
    <>
      <LiveReviewTitleV2Main lang={lang} dict={dict} />
      <div className='h-4' />
      <CategoryFilterTabsV2Wrapper
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className='h-4' />
      <LiveReviewCarouselV2Wrapper lang={lang} dict={dict} selectedCategory={selectedCategory} />
    </>
  );
}

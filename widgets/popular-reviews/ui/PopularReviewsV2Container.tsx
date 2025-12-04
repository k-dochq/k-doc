'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { CategoryFilterTabsV2Wrapper } from 'widgets/hospital-list/ui/CategoryFilterTabsV2Wrapper';
import { PopularReviewsTitleV2 } from './PopularReviewsTitleV2';
import { PopularReviewsCarouselV2Wrapper } from './PopularReviewsCarouselV2Wrapper';

interface PopularReviewsV2ContainerProps {
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviewsV2Container({ lang, dict }: PopularReviewsV2ContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  return (
    <>
      <PopularReviewsTitleV2 lang={lang} dict={dict} />
      <div className='h-4' />
      <CategoryFilterTabsV2Wrapper
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className='h-4' />
      <PopularReviewsCarouselV2Wrapper
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
      />
    </>
  );
}

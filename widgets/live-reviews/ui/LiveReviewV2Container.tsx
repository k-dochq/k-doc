'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { CategoryFilterTabsV2Wrapper } from 'widgets/hospital-list/ui/CategoryFilterTabsV2Wrapper';
import { LiveReviewTitleV2 } from './LiveReviewTitleV2';
import { LiveReviewCarouselV2Wrapper } from './LiveReviewCarouselV2Wrapper';

interface LiveReviewV2ContainerProps {
  lang: Locale;
  dict: Dictionary;
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
}

export function LiveReviewV2Container({
  lang,
  dict,
  medicalSpecialties,
}: LiveReviewV2ContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  return (
    <>
      <LiveReviewTitleV2 lang={lang} dict={dict} />
      <div className='h-4' />
      <CategoryFilterTabsV2Wrapper
        lang={lang}
        dict={dict}
        medicalSpecialties={medicalSpecialties}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className='h-4' />
      <LiveReviewCarouselV2Wrapper lang={lang} dict={dict} selectedCategory={selectedCategory} />
    </>
  );
}

'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { CategoryFilterTabsV2Wrapper } from './CategoryFilterTabsV2Wrapper';
import { HospitalListCarouselV2Wrapper } from './HospitalListCarouselV2Wrapper';

interface HospitalListV2ContainerProps {
  lang: Locale;
  dict: Dictionary;
  initialData?: HospitalCardData[];
}

export function HospitalListV2Container({ lang, dict, initialData }: HospitalListV2ContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  return (
    <>
      <CategoryFilterTabsV2Wrapper
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className='h-4' />
      <HospitalListCarouselV2Wrapper
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        initialData={initialData}
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { CategoryFilterTabsV2 } from 'shared/ui/category-filter-tabs';

interface CategoryFilterTabsV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
}

export function CategoryFilterTabsV2Wrapper({
  lang,
  dict,
  medicalSpecialties,
}: CategoryFilterTabsV2WrapperProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  const handleCategoryChange = (category: MedicalSpecialtyType | 'ALL') => {
    setSelectedCategory(category);
    // TODO: 병원 리스트 필터링 로직 추가 예정
  };

  return (
    <CategoryFilterTabsV2
      lang={lang}
      dict={dict}
      medicalSpecialties={medicalSpecialties}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  );
}

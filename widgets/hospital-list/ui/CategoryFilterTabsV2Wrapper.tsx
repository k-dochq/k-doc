'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { CategoryFilterTabsV2 } from 'shared/ui/category-filter-tabs';

interface CategoryFilterTabsV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  selectedCategory: MedicalSpecialtyType | 'ALL';
  onCategoryChange: (category: MedicalSpecialtyType | 'ALL') => void;
}

export function CategoryFilterTabsV2Wrapper({
  lang,
  dict,
  medicalSpecialties,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterTabsV2WrapperProps) {
  return (
    <CategoryFilterTabsV2
      lang={lang}
      dict={dict}
      medicalSpecialties={medicalSpecialties}
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
    />
  );
}

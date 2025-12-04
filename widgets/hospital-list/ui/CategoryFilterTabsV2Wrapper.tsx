'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { CategoryFilterTabsV2 } from 'shared/ui/category-filter-tabs';
import { CategoryFilterTabsSkeleton } from 'shared/ui/category-filter-tabs/CategoryFilterTabsSkeleton';
import { useMedicalSpecialties } from 'entities/hospital/api/queries/use-medical-specialties';

interface CategoryFilterTabsV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: MedicalSpecialtyType | 'ALL';
  onCategoryChange: (category: MedicalSpecialtyType | 'ALL') => void;
}

export function CategoryFilterTabsV2Wrapper({
  lang,
  dict,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterTabsV2WrapperProps) {
  const { data: medicalSpecialties, isLoading, error } = useMedicalSpecialties();

  // 로딩 중이면 스켈레톤 표시
  if (isLoading) {
    return <CategoryFilterTabsSkeleton />;
  }

  // 에러 또는 데이터 없으면 null 반환
  if (error || !medicalSpecialties || medicalSpecialties.length === 0) {
    return null;
  }

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

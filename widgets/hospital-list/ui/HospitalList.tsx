'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { HospitalListTitle } from './HospitalListTitle';
import { HospitalListTabs } from './HospitalListTabs';

interface HospitalListProps {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  lang: Locale;
  dict: Dictionary;
}

export function HospitalList({ medicalSpecialties, lang, dict }: HospitalListProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  const handleViewAll = () => {
    // TODO: 전체보기 페이지로 이동하는 로직 구현
    console.log('View all hospitals for category:', selectedCategory);
  };

  const handleCategoryChange = (category: MedicalSpecialtyType | 'ALL') => {
    setSelectedCategory(category);
  };

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <HospitalListTitle lang={lang} dict={dict} onViewAll={handleViewAll} />
      </div>

      <div className='mb-4'>
        <HospitalListTabs
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}

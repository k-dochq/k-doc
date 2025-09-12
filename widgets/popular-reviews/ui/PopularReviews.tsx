'use client';

import { Suspense, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { PopularReviewsTitle } from './PopularReviewsTitle';
import { CategoryFilterTabs } from 'shared/ui/category-filter-tabs';

interface PopularReviewsProps {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviews({ medicalSpecialties, lang, dict }: PopularReviewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  const handleViewAll = () => {
    // TODO: 전체보기 페이지로 이동하는 로직 구현
    console.log('View all popular reviews for category:', selectedCategory);
  };

  const handleCategoryChange = (category: MedicalSpecialtyType | 'ALL') => {
    setSelectedCategory(category);
  };

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <PopularReviewsTitle lang={lang} dict={dict} onViewAll={handleViewAll} />
      </div>

      <div className='mb-4'>
        <CategoryFilterTabs
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* 후기 리스트 표시 - 추후 구현 */}
      <div className=''>
        <div className='py-8 text-center text-gray-500'>후기 리스트가 여기에 표시됩니다</div>
      </div>
    </div>
  );
}

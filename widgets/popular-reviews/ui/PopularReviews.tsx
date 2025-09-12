'use client';

import { Suspense, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { usePopularReviews } from 'entities/review';
import { PopularReviewsTitle } from './PopularReviewsTitle';
import { CategoryFilterTabs } from 'shared/ui/category-filter-tabs';

interface PopularReviewsProps {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviews({ medicalSpecialties, lang, dict }: PopularReviewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  // TanStack Query를 사용하여 popular reviews 데이터 페칭
  const {
    data: popularReviews,
    isLoading,
    error,
  } = usePopularReviews({
    category: selectedCategory,
    limit: 5,
  });

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

      {/* 후기 리스트 표시 */}
      <div className=''>
        {isLoading ? (
          <div className='py-8 text-center text-gray-500'>후기를 불러오는 중...</div>
        ) : error ? (
          <div className='py-8 text-center text-red-500'>
            후기를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : popularReviews && popularReviews.reviews.length > 0 ? (
          <div className='py-8 text-center text-gray-500'>
            {popularReviews.reviews.length}개의 인기 후기가 있습니다.
            {/* TODO: 실제 후기 리스트 UI 구현 */}
          </div>
        ) : (
          <div className='py-8 text-center text-gray-500'>표시할 후기가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

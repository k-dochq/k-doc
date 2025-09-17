'use client';

import { Suspense, useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { usePopularReviews } from 'entities/review';
import { PopularReviewsTitle } from './PopularReviewsTitle';
import { PopularReviewsList } from './PopularReviewsList';
import { PopularReviewsSkeleton } from './PopularReviewsSkeleton';
import { PopularReviewsError } from './PopularReviewsError';
import { CategoryFilterTabs } from 'shared/ui/category-filter-tabs';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface PopularReviewsProps {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviews({ medicalSpecialties, lang, dict }: PopularReviewsProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');
  const router = useLocalizedRouter();

  // TanStack Query를 사용하여 popular reviews 데이터 페칭
  const {
    data: popularReviews,
    isLoading,
    error,
    refetch,
  } = usePopularReviews({
    category: selectedCategory,
    limit: 5,
  });

  // 페이지 prefetch
  useEffect(() => {
    router.prefetch('/reviews');
  }, [router]);

  const handleViewAll = () => {
    router.push('/reviews');
  };

  const handleRetry = () => {
    // TanStack Query의 refetch를 사용하여 재시도
    refetch();
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
          <PopularReviewsSkeleton />
        ) : error ? (
          <PopularReviewsError lang={lang} dict={dict} onRetry={handleRetry} />
        ) : popularReviews && popularReviews.reviews.length > 0 ? (
          <PopularReviewsList reviews={popularReviews.reviews} lang={lang} dict={dict} />
        ) : (
          <div className='py-8 text-center text-gray-500'>표시할 후기가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

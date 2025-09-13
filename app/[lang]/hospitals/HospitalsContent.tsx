'use client';

import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalSort, DEFAULT_HOSPITAL_SORT } from 'shared/model/types';
import { HospitalsInfiniteList } from './HospitalsInfiniteList';
import { CategorySection, useCategories } from 'features/category-filter';
import { HospitalFilterBar } from 'features/hospital-filter';
import { type MedicalSpecialtyType } from '@prisma/client';

interface HospitalsContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: string;
    sort?: string;
  };
}

export function HospitalsContent({ lang, dict, searchParams }: HospitalsContentProps) {
  // TanStack Query로 카테고리 데이터 가져오기
  const {
    // data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // string을 MedicalSpecialtyType으로 안전하게 변환
  const currentCategory = searchParams.category as MedicalSpecialtyType | undefined;

  // 정렬 파라미터 처리 - 타입 안전하게 변환
  const currentSort: HospitalSort =
    searchParams.sort === 'popular' || searchParams.sort === 'recommended'
      ? searchParams.sort
      : DEFAULT_HOSPITAL_SORT;

  return (
    <div className=''>
      {/* 카테고리 섹션 */}
      <CategorySection
        lang={lang}
        dict={dict}
        currentCategory={currentCategory}
        isLoading={categoriesLoading}
        error={categoriesError}
      />

      {/* 정렬/필터 바 */}
      <HospitalFilterBar lang={lang} />

      {/* 병원 리스트 */}
      <HospitalsInfiniteList
        lang={lang}
        searchParams={{
          category: currentCategory,
          sort: currentSort,
        }}
        dict={dict}
      />
    </div>
  );
}

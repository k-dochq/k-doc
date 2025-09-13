'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalsInfiniteList } from './HospitalsInfiniteList';
import { CategorySection, useCategories } from 'features/category-filter';

interface HospitalsContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: string;
  };
}

export function HospitalsContent({ lang, dict, searchParams }: HospitalsContentProps) {
  // TanStack Query로 카테고리 데이터 가져오기
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  return (
    <div className=''>
      {/* 카테고리 섹션 */}
      <CategorySection
        lang={lang}
        dict={dict}
        categories={categories}
        currentCategory={searchParams.category}
        isLoading={categoriesLoading}
        error={categoriesError}
      />

      {/* 병원 리스트 */}
      <HospitalsInfiniteList lang={lang} searchParams={searchParams} dict={dict} />
    </div>
  );
}

'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { AllReviewsInfiniteList } from './AllReviewsInfiniteList';
import { CategorySection, useCategories } from 'features/category-filter';
import { ReviewFilterBar } from 'features/review-filter';
import { type MedicalSpecialtyType } from '@prisma/client';

interface AllReviewsContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: string;
    sort?: string;
  };
}

export function AllReviewsContent({ lang, dict, searchParams }: AllReviewsContentProps) {
  // TanStack Query로 카테고리 데이터 가져오기
  const {
    // data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // string을 MedicalSpecialtyType으로 안전하게 변환
  const currentCategory = searchParams.category as MedicalSpecialtyType | undefined;

  // 정렬 파라미터 처리 - 타입 안전하게 변환
  const currentSort: ReviewSortOption =
    searchParams.sort === REVIEW_SORT_OPTIONS.LATEST ||
    searchParams.sort === REVIEW_SORT_OPTIONS.POPULAR
      ? (searchParams.sort as ReviewSortOption)
      : REVIEW_SORT_OPTIONS.LATEST;

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
      <ReviewFilterBar lang={lang} dict={dict} />

      {/* 리뷰 리스트 */}
      <AllReviewsInfiniteList
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

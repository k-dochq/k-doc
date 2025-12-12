'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { CategorySectionV2 } from 'features/category-filter/ui/CategorySectionV2';
import { ReviewFilterBarV2 } from 'features/review-filter';
import { ReviewsInfiniteListV2 } from './ReviewsInfiniteListV2';
import { useCategories } from 'features/category-filter';

interface ReviewsContentV2Props {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: string;
    sort?: string;
  };
}

export function ReviewsContentV2({ lang, dict, searchParams }: ReviewsContentV2Props) {
  // TanStack Query로 카테고리 데이터 가져오기
  const { isLoading: categoriesLoading, error: categoriesError } = useCategories();

  // category 파라미터 처리
  const currentCategory = searchParams.category;

  // sort 파라미터 처리 (기본값: 인기순)
  const currentSort: ReviewSortOption =
    (searchParams.sort as ReviewSortOption) || REVIEW_SORT_OPTIONS.POPULAR;

  return (
    <div className=''>
      {/* 카테고리 섹션 */}
      <CategorySectionV2
        lang={lang}
        dict={dict}
        currentCategory={currentCategory}
        isLoading={categoriesLoading}
        error={categoriesError}
        variant='all'
      />

      {/* 정렬 필터 바 */}
      <ReviewFilterBarV2 lang={lang} dict={dict} currentSort={currentSort} />

      {/* 리뷰 리스트 */}
      <ReviewsInfiniteListV2
        lang={lang}
        dict={dict}
        category={currentCategory}
        sort={currentSort}
      />
    </div>
  );
}

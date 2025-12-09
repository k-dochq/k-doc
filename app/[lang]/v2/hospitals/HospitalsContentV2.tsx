'use client';

import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCategoryType } from 'shared/model/types';
import { type HospitalSortOption, HOSPITAL_SORT_OPTIONS } from 'shared/model/types/hospital-query';
import { HospitalsInfiniteListV2 } from './HospitalsInfiniteListV2';
import { CategorySectionV2 } from 'features/category-filter/ui/CategorySectionV2';
import { useCategories } from 'features/category-filter';
import { FilterBarV2 } from 'features/hospital-filter';
import { useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';

interface HospitalsContentV2Props {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: string;
    sort?: string;
    search?: string;
  };
}

export function HospitalsContentV2({ lang, dict, searchParams }: HospitalsContentV2Props) {
  // 지역 필터 상태 관리
  const districtFilter = useDistrictFilter();

  // TanStack Query로 카테고리 데이터 가져오기
  const {
    // data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // string을 HospitalCategoryType으로 안전하게 변환
  // category가 없으면 기본값으로 'RECOMMEND' 사용
  const categoryParam = searchParams.category;
  const currentCategory: HospitalCategoryType = categoryParam
    ? categoryParam === 'RECOMMEND'
      ? 'RECOMMEND'
      : (categoryParam as HospitalCategoryType)
    : 'RECOMMEND'; // 기본값: 추천

  // 정렬 파라미터 처리 - 타입 안전하게 변환
  const currentSort: HospitalSortOption =
    searchParams.sort === HOSPITAL_SORT_OPTIONS.POPULAR ||
    searchParams.sort === HOSPITAL_SORT_OPTIONS.RECOMMENDED ||
    searchParams.sort === HOSPITAL_SORT_OPTIONS.NEWEST
      ? (searchParams.sort as HospitalSortOption)
      : HOSPITAL_SORT_OPTIONS.POPULAR;

  // 검색어 파라미터 처리 (v2 리스트에서는 검색바 사용 안 함)
  const currentSearch = undefined;

  return (
    <div className=''>
      {/* 카테고리 섹션 */}
      <CategorySectionV2
        lang={lang}
        dict={dict}
        currentCategory={currentCategory}
        isLoading={categoriesLoading}
        error={categoriesError}
      />

      {/* 필터 바 */}
      <FilterBarV2
        lang={lang}
        dict={dict}
        currentSort={currentSort}
        districtFilter={districtFilter}
      />

      {/* 병원 리스트 */}
      <HospitalsInfiniteListV2
        lang={lang}
        searchParams={{
          category: currentCategory,
          sort: currentSort,
          search: currentSearch,
          districtIds: districtFilter.selectedDistrictIds,
        }}
        dict={dict}
      />
    </div>
  );
}

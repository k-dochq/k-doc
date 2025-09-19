'use client';

import { type Locale } from 'shared/config';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { type Dictionary } from 'shared/model/types';
import { FilterBar, type FilterOption } from 'shared/ui/filter-bar';

interface ReviewFilterBarProps {
  lang: Locale;
  dict: Dictionary;
}

export function ReviewFilterBar({ lang, dict }: ReviewFilterBarProps) {
  const filterOptions: FilterOption<ReviewSortOption>[] = [
    {
      value: REVIEW_SORT_OPTIONS.LATEST,
      label: dict.allReviews.sort.latest,
    },
    {
      value: REVIEW_SORT_OPTIONS.POPULAR,
      label: dict.allReviews.sort.popular,
      isDefault: true,
    },
  ];

  return <FilterBar lang={lang} options={filterOptions} basePath='/reviews' paramName='sort' />;
}

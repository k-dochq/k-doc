'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type Category } from '../model/useCategories';
import { CategorySectionSkeleton } from './CategorySectionSkeleton';
import { CategorySectionError } from './CategorySectionError';

interface CategorySectionProps {
  lang: Locale;
  dict: Dictionary;
  categories: Category[];
  currentCategory?: string;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export function CategorySection({
  lang,
  dict,
  categories,
  currentCategory,
  isLoading = false,
  error = null,
  onRetry,
}: CategorySectionProps) {
  if (isLoading) {
    return <CategorySectionSkeleton />;
  }

  if (error) {
    return <CategorySectionError lang={lang} dict={dict} error={error} onRetry={onRetry} />;
  }

  return (
    <div className=''>
      <div className='flex flex-wrap gap-2'>
        {/* 전체 카테고리 */}
        <LocaleLink
          href={`/hospitals`}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            !currentCategory
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          전체
        </LocaleLink>

        {/* 각 카테고리 */}
        {categories.map((category) => {
          const categoryName = getLocalizedTextByLocale(category.name, lang);
          const isActive = currentCategory === category.specialtyType;

          return (
            <LocaleLink
              key={category.id}
              href={`/hospitals?category=${category.specialtyType}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryName}
            </LocaleLink>
          );
        })}
      </div>
    </div>
  );
}

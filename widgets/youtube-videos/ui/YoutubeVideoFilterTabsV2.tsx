'use client';

import { type Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useYoutubeVideoCategories } from 'entities/youtube-video';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface YoutubeVideoFilterTabsV2Props {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function YoutubeVideoFilterTabsV2({
  lang,
  dict,
  selectedCategory,
  onCategoryChange,
}: YoutubeVideoFilterTabsV2Props) {
  const { data: categoriesData, isLoading } = useYoutubeVideoCategories();

  // 로딩 중이면 빈 div 반환 (또는 스켈레톤)
  if (isLoading) {
    return <div className='flex w-full items-center gap-1' />;
  }

  // 카테고리 데이터가 없으면 빈 div 반환
  if (!categoriesData || categoriesData.categories.length === 0) {
    return <div className='flex w-full items-center gap-1' />;
  }

  // "전체" 탭과 DB에서 불러온 카테고리들로 탭 구성
  const tabs = [
    { id: null, label: dict.youtube.filter.all },
    ...categoriesData.categories.map((category) => ({
      id: category.id,
      label: extractLocalizedText(category.name as Prisma.JsonValue, lang) || '',
    })),
  ];

  return (
    <div className='flex w-full items-center gap-1 pl-5'>
      {tabs.map((tab) => {
        const isSelected = selectedCategory === tab.id;

        return (
          <button
            key={tab.id || 'all'}
            onClick={() => onCategoryChange(tab.id)}
            className={`relative flex shrink-0 items-center justify-center gap-[10px] border-t-0 border-r-0 border-b-2 border-l-0 border-solid px-2 py-[6px] transition-colors ${
              isSelected ? 'border-primary-900 text-primary-900' : 'border-transparent text-neutral-400'
            }`}
          >
            <p className='relative shrink-0 text-base leading-6 font-medium not-italic'>
              {tab.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

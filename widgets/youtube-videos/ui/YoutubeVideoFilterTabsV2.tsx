'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface YoutubeVideoFilterTabsV2Props {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

// 카테고리 ID 매핑
const CATEGORY_IDS = {
  POPULAR: '3f8d847e-1595-4551-9f1b-f03e8cabb744',
  RECOMMENDED: 'a075eb19-4c6d-48ff-97c2-52b3cf82e5d7',
} as const;

export function YoutubeVideoFilterTabsV2({
  lang,
  dict,
  selectedCategory,
  onCategoryChange,
}: YoutubeVideoFilterTabsV2Props) {
  const tabs = [
    { id: null, labelKey: 'all' as const },
    { id: CATEGORY_IDS.POPULAR, labelKey: 'popular' as const },
    { id: CATEGORY_IDS.RECOMMENDED, labelKey: 'recommended' as const },
  ];

  return (
    <div className='flex w-full items-center gap-1'>
      {tabs.map((tab) => {
        const isSelected = selectedCategory === tab.id;
        const label = dict.youtube.filter[tab.labelKey];

        return (
          <button
            key={tab.id || 'all'}
            onClick={() => onCategoryChange(tab.id)}
            className={`relative flex shrink-0 items-center justify-center gap-[10px] px-2 py-[6px] transition-colors ${
              isSelected
                ? 'border-t-0 border-r-0 border-b border-l-0 border-solid border-[#f15bff] text-[#f15bff]'
                : 'text-neutral-400'
            }`}
          >
            <p className="relative shrink-0 font-['Pretendard:Medium',sans-serif] text-[14px] leading-[20px] not-italic">
              {label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

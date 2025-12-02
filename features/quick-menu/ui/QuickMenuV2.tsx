'use client';

import { useRef, useState } from 'react';
import { type QuickMenuProps } from '../model/types';
import { QUICK_MENU_CATEGORIES_V2 } from '../model/categoriesV2';
import { QuickMenuButtonV2 } from './QuickMenuButtonV2';
import { QuickMenuIndicatorV2 } from './QuickMenuIndicatorV2';

export function QuickMenuV2({ lang }: QuickMenuProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 첫 줄: 눈, 코, 리프팅, 안면윤곽, 가슴, 줄기세포 (6개)
  const firstRow = QUICK_MENU_CATEGORIES_V2.slice(0, 6);
  // 둘째 줄: 지방흡입, 바디, 모발이식, 피부과, 치과, 기타 (6개)
  const secondRow = QUICK_MENU_CATEGORIES_V2.slice(6, 12);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className='scrollbar-hide overflow-x-auto scroll-smooth px-5'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex gap-4'>
            {firstRow.map((category) => (
              <QuickMenuButtonV2 key={category.id} category={category} lang={lang} />
            ))}
          </div>
          <div className='flex gap-4'>
            {secondRow.map((category) => (
              <QuickMenuButtonV2 key={category.id} category={category} lang={lang} />
            ))}
          </div>
        </div>
      </div>
      <QuickMenuIndicatorV2 scrollProgress={scrollProgress} />
    </div>
  );
}

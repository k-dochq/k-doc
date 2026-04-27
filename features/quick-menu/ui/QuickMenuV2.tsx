'use client';

import { useRef, useEffect } from 'react';
import { type QuickMenuProps } from '../model/types';
import { QUICK_MENU_CATEGORIES_V2 } from '../model/categories';
import { QuickMenuButtonV2 } from './QuickMenuButtonV2';
import { QuickMenuIndicatorV2 } from './QuickMenuIndicatorV2';

export function QuickMenuV2({ lang }: QuickMenuProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // 첫 줄: 눈, 코, 리프팅, 안면윤곽, 가슴, 줄기세포 (6개)
  const firstRow = QUICK_MENU_CATEGORIES_V2.slice(0, 6);
  // 둘째 줄: 지방흡입, 바디, 모발이식, 피부과, 치과, 기타 (6개)
  const secondRow = QUICK_MENU_CATEGORIES_V2.slice(6, 12);

  const isRtl = lang === 'ar';

  useEffect(() => {
    const element = scrollContainerRef.current;
    const indicator = indicatorRef.current;
    if (!element || !indicator) return;

    let ticking = false;

    const updateIndicator = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const maxScroll = scrollWidth - clientWidth;
      // Clamp scrollLeft to its valid scroll range to prevent indicator jumping during
      // iOS Safari bounce (overscroll). RTL: valid range [-maxScroll, 0], LTR: [0, maxScroll]
      const clampedScrollLeft = isRtl
        ? Math.min(0, Math.max(-maxScroll, scrollLeft))
        : Math.max(0, Math.min(maxScroll, scrollLeft));
      const progress = maxScroll > 0 ? Math.abs(clampedScrollLeft) / maxScroll : 0;
      // In RTL: start=right(offset=16), end=left(offset=0) — reverse direction
      const offset = isRtl ? (1 - progress) * 16 : progress * 16; // 40px - 24px = 16px

      indicator.style.transform = `translateX(${offset}px)`;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateIndicator();
          ticking = false;
        });
        ticking = true;
      }
    };

    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex w-full flex-col gap-4'>
      <div
        ref={scrollContainerRef}
        className='scrollbar-hide overflow-x-auto'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className='flex flex-col gap-3 ps-5'>
          <div className='flex'>
            {firstRow.map((category, index) => (
              <QuickMenuButtonV2
                key={category.id}
                category={category}
                lang={lang}
                isFirst={index === 0}
              />
            ))}
            <div className='w-2 shrink-0' />
          </div>
          <div className='flex'>
            {secondRow.map((category, index) => (
              <QuickMenuButtonV2
                key={category.id}
                category={category}
                lang={lang}
                isFirst={index === 0}
              />
            ))}
            <div className='w-2 shrink-0' />
          </div>
        </div>
      </div>
      <QuickMenuIndicatorV2 indicatorRef={indicatorRef} isRtl={isRtl} />
    </div>
  );
}

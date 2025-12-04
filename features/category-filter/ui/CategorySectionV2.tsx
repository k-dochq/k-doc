'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { CategorySectionSkeleton } from './CategorySectionSkeleton';
import { CategorySectionError } from './CategorySectionError';
import {
  CategoryButtonV2,
  type CategoryButtonV2Data,
} from 'shared/ui/category-button/CategoryButtonV2';
import { CATEGORIES } from 'features/quick-menu/model/categories';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';

interface CategorySectionV2Props {
  lang: Locale;
  dict: Dictionary;
  currentCategory?: string;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export function CategorySectionV2({
  lang,
  dict,
  currentCategory,
  isLoading = false,
  error = null,
  onRetry,
}: CategorySectionV2Props) {
  const [api, setApi] = useState<CarouselApi>();
  const pathname = usePathname();

  // 퀵메뉴 카테고리 데이터를 CategoryButtonV2Data 형태로 변환하고 'all'을 첫 번째로 정렬
  const categoryButtons: CategoryButtonV2Data[] = CATEGORIES.map((category) => ({
    type: category.type,
    labels: category.labels,
    icon: category.iconSmall,
  })).sort((a, b) => {
    // 'all' 타입을 첫 번째로 정렬
    if (a.type === 'all') return -1;
    if (b.type === 'all') return 1;
    return 0;
  });

  // 활성 카테고리가 변경될 때마다 해당 버튼으로 스크롤 (뒤로가기 제외)
  useEffect(() => {
    if (!api || isLoading || error) return;

    // 뒤로가기를 통해 페이지에 왔을 경우 자동 스크롤 건너뛰기
    if (typeof window !== 'undefined') {
      const navigationType = window.performance?.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;
      if (navigationType?.type === 'back_forward') {
        return;
      }
    }

    const activeIndex = categoryButtons.findIndex((categoryButton) => {
      return categoryButton.type === 'all'
        ? !currentCategory
        : currentCategory === categoryButton.type;
    });

    if (activeIndex !== -1 && activeIndex >= 5) {
      api.scrollTo(activeIndex);
    }
  }, [api, currentCategory, categoryButtons, isLoading, error]);

  if (isLoading) {
    return <CategorySectionSkeleton />;
  }

  if (error) {
    return <CategorySectionError lang={lang} dict={dict} error={error} onRetry={onRetry} />;
  }

  return (
    <div className='w-full overflow-visible'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className='py-4 pl-5'>
          {categoryButtons.map((categoryButton, index) => {
            const isActive =
              categoryButton.type === 'all'
                ? !currentCategory
                : currentCategory === categoryButton.type;
            const href =
              categoryButton.type === 'all'
                ? pathname || undefined
                : `${pathname || ''}?category=${categoryButton.type}`;
            const isLast = index === categoryButtons.length - 1;

            return (
              <CarouselItem key={categoryButton.type} className='basis-auto'>
                {isLast ? (
                  <div className='pr-5'>
                    <CategoryButtonV2
                      category={categoryButton}
                      lang={lang}
                      href={href}
                      replace={true}
                      isActive={isActive}
                      className={categoryButton.type === 'all' ? 'w-[60px]' : 'w-[71px]'}
                    />
                  </div>
                ) : (
                  <CategoryButtonV2
                    category={categoryButton}
                    lang={lang}
                    href={href}
                    replace={true}
                    isActive={isActive}
                    className={categoryButton.type === 'all' ? 'w-[60px]' : 'w-[71px]'}
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

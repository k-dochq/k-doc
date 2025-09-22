'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { CategorySectionSkeleton } from './CategorySectionSkeleton';
import { CategorySectionError } from './CategorySectionError';
import { CategoryButton, type CategoryButtonData } from 'shared/ui/category-button';
import { CATEGORIES } from 'features/quick-menu/model/categories';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';

interface CategorySectionProps {
  lang: Locale;
  dict: Dictionary;
  currentCategory?: string;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export function CategorySection({
  lang,
  dict,
  currentCategory,
  isLoading = false,
  error = null,
  onRetry,
}: CategorySectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const pathname = usePathname();

  // 퀵메뉴 카테고리 데이터를 CategoryButtonData 형태로 변환하고 '전체'를 첫 번째로 정렬
  const categoryButtons: CategoryButtonData[] = CATEGORIES.map((category) => ({
    type: category.type,
    labels: category.labels,
    icon: category.icon,
  })).sort((a, b) => {
    // 'all' 타입을 첫 번째로 정렬
    if (a.type === 'all') return -1;
    if (b.type === 'all') return 1;
    return 0;
  });

  // 활성 카테고리가 변경될 때마다 해당 버튼으로 스크롤
  useEffect(() => {
    if (!api || isLoading || error) return;

    const activeIndex = categoryButtons.findIndex((categoryButton) => {
      return categoryButton.type === 'all'
        ? !currentCategory
        : currentCategory === categoryButton.type;
    });

    if (activeIndex !== -1) {
      // 활성 카테고리 버튼을 중앙으로 스크롤
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
    <div className='w-full px-5 py-4'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-3'>
          {categoryButtons.map((categoryButton) => {
            const isActive =
              categoryButton.type === 'all'
                ? !currentCategory
                : currentCategory === categoryButton.type;
            const href =
              categoryButton.type === 'all'
                ? pathname || undefined
                : `${pathname || ''}?category=${categoryButton.type}`;

            return (
              <CarouselItem key={categoryButton.type} className='basis-auto pl-3'>
                <CategoryButton
                  category={categoryButton}
                  lang={lang}
                  href={href}
                  replace={true}
                  isActive={isActive}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

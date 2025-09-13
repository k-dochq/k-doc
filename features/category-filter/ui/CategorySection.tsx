'use client';

import { useState } from 'react';
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

  if (isLoading) {
    return <CategorySectionSkeleton />;
  }

  if (error) {
    return <CategorySectionError lang={lang} dict={dict} error={error} onRetry={onRetry} />;
  }

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

  return (
    <div className='w-full'>
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
                ? '/hospitals'
                : `/hospitals?category=${categoryButton.type}`;

            return (
              <CarouselItem key={categoryButton.type} className='basis-auto pl-3'>
                <CategoryButton
                  category={categoryButton}
                  lang={lang}
                  href={href}
                  replace={true}
                  iconClassName={isActive ? 'border-2 border-primary bg-primary/10' : ''}
                  labelClassName={isActive ? 'text-primary font-semibold' : ''}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

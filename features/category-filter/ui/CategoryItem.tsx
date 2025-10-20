'use client';

import { type Locale } from 'shared/config';
import { CategoryButton, type CategoryButtonData } from 'shared/ui/category-button';
import { CarouselItem } from 'shared/ui/carousel';

interface CategoryItemProps {
  category: CategoryButtonData;
  lang: Locale;
  href?: string;
  isActive: boolean;
  isLast: boolean;
  isAll: boolean;
}

export function CategoryItem({
  category,
  lang,
  href,
  isActive,
  isLast,
  isAll,
}: CategoryItemProps) {
  const buttonElement = (
    <CategoryButton
      category={category}
      lang={lang}
      href={href}
      replace={true}
      isActive={isActive}
      className={isAll ? '!w-[60px] pr-[10px]' : ''}
    />
  );

  if (isLast) {
    return (
      <CarouselItem className='basis-auto'>
        <div className='pr-5'>{buttonElement}</div>
      </CarouselItem>
    );
  }

  return <CarouselItem className='basis-auto'>{buttonElement}</CarouselItem>;
}


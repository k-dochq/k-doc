'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { type LocalizedText } from 'shared/lib/localized-text';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { useDeviceDetection } from './lib/useDeviceDetection';
import { useCarouselNavigation } from './lib/useCarouselNavigation';
import { DesktopNavigation } from './ui/DesktopNavigation';
import { CategoryFilterButton } from './ui/CategoryFilterButton';

interface CategoryFilterTabsProps {
  lang: Locale;
  dict: Dictionary;
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  selectedCategory: MedicalSpecialtyType | 'ALL';
  onCategoryChange: (category: MedicalSpecialtyType | 'ALL') => void;
}

export function CategoryFilterTabs({
  lang,
  medicalSpecialties,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const { isDesktop } = useDeviceDetection();
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarouselNavigation(api);

  // 전체 카테고리 + 의료 전문 분야 카테고리 조합
  const allCategories = [
    {
      id: 'ALL' as const,
      name: {
        ko_KR: '전체',
        en_US: 'All',
        th_TH: 'ทั้งหมด',
        zh_TW: '全部',
        ja_JP: 'すべて',
        hi_IN: 'सभी',
        tl_PH: 'All',
        ar_SA: 'الكل',
      },
    },
    ...medicalSpecialties.map((specialty) => ({
      id: specialty.specialtyType,
      name: specialty.name as LocalizedText,
    })),
  ];

  return (
    <div className='relative w-full'>
      {/* PC 환경에서만 네비게이션 버튼 표시 */}
      {isDesktop && (
        <DesktopNavigation
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          onScrollPrev={scrollPrev}
          onScrollNext={scrollNext}
        />
      )}

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          dragFree: true,
          containScroll: 'trimSnaps',
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-2 pl-5'>
          {allCategories.map((category, index) => {
            const isSelected = selectedCategory === category.id;
            const isLast = index === allCategories.length - 1;

            return (
              <CarouselItem key={category.id} className='basis-auto pl-2'>
                {isLast ? (
                  <div className='pr-5'>
                    <CategoryFilterButton
                      category={category}
                      lang={lang}
                      isSelected={isSelected}
                      onClick={onCategoryChange}
                    />
                  </div>
                ) : (
                  <CategoryFilterButton
                    category={category}
                    lang={lang}
                    isSelected={isSelected}
                    onClick={onCategoryChange}
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

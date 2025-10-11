'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { type LocalizedText, extractLocalizedText } from 'shared/lib/localized-text';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from 'shared/ui/carousel';
import { useDeviceDetection } from './lib/useDeviceDetection';
import { useCarouselNavigation } from './lib/useCarouselNavigation';
import { DesktopNavigation } from './ui/DesktopNavigation';

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
    { id: 'ALL' as const, name: { ko_KR: '전체', en_US: 'All', th_TH: 'ทั้งหมด' } },
    ...medicalSpecialties.map((specialty) => ({
      id: specialty.specialtyType,
      name: specialty.name as LocalizedText,
    })),
  ];

  const getLabel = (category: { name: LocalizedText }): string => {
    return extractLocalizedText(category.name, lang);
  };

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
                <div className={isLast ? 'pr-5' : ''}>
                  <button
                    onClick={() => onCategoryChange(category.id)}
                    className={`flex min-w-[43px] shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors align-middle ${
                      isSelected
                        ? 'bg-primary hover:bg-primary/80 text-white border border-transparent'
                        : 'border border-neutral-200 bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <span className='leading-4'>{getLabel(category)}</span>
                  </button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

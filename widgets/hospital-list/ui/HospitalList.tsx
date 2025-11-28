'use client';

import { Suspense, useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { useBestHospitals } from 'entities/hospital/api/queries/get-best-hospitals';
import { HospitalListError } from 'features/hospital-list/ui';
import { HospitalList as HospitalListComponent } from 'entities/hospital/ui/HospitalList';
import { HospitalListTitle } from './HospitalListTitle';
import { CategoryFilterTabs } from 'shared/ui/category-filter-tabs';
import { HospitalListSkeleton } from './HospitalListSkeleton';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { CrownBackground } from 'shared/ui/crown-background';

interface HospitalListProps {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  lang: Locale;
  dict: Dictionary;
  initialData?: HospitalCardData[];
}

export function HospitalList({ medicalSpecialties, lang, dict, initialData }: HospitalListProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');
  const router = useLocalizedRouter();

  // TanStack Query를 사용하여 best hospitals 데이터 페칭
  const {
    data: bestHospitals,
    isLoading,
    error,
    refetch,
  } = useBestHospitals(
    {
      category: selectedCategory,
      limit: 2,
    },
    {
      // 서버에서 prefetch한 데이터를 초기 데이터로 사용 (ALL 카테고리일 때만)
      initialData: selectedCategory === 'ALL' ? initialData : undefined,
    },
  );

  // 페이지 prefetch
  useEffect(() => {
    router.prefetch('/hospitals');
  }, [router]);

  const handleViewAll = () => {
    router.push('/hospitals');
  };

  const handleCategoryChange = (category: MedicalSpecialtyType | 'ALL') => {
    setSelectedCategory(category);
  };

  const handleRetry = () => {
    // TanStack Query의 refetch를 사용하여 재시도
    refetch();
  };

  // 에러 상태 처리
  if (error) {
    return (
      <HospitalListError
        lang={lang}
        dict={dict}
        medicalSpecialties={medicalSpecialties}
        selectedCategory={selectedCategory}
        onViewAll={handleViewAll}
        onCategoryChange={handleCategoryChange}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className='w-full'>
      <div className='relative mb-4'>
        <CrownBackground />
        <div className='relative z-20 px-5'>
          <HospitalListTitle lang={lang} dict={dict} onViewAll={handleViewAll} />
        </div>
      </div>

      <div className='mb-4'>
        <CategoryFilterTabs
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* 병원 리스트 표시 */}
      <div className='px-5'>
        {isLoading ? (
          <HospitalListSkeleton />
        ) : bestHospitals ? (
          <HospitalListComponent hospitals={bestHospitals} dict={dict} lang={lang} />
        ) : null}
      </div>
    </div>
  );
}

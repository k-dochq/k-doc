'use client';

import { Suspense, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { type MedicalSpecialtyWithTranslations } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { useBestHospitals } from 'entities/hospital/api/queries/get-best-hospitals';
import { HospitalList as HospitalListComponent } from 'entities/hospital/ui/HospitalList';
import { HospitalListTitle } from './HospitalListTitle';
import { HospitalListTabs } from './HospitalListTabs';
import { HospitalListSkeleton } from './HospitalListSkeleton';

interface HospitalListProps {
  medicalSpecialties: MedicalSpecialtyWithTranslations[];
  lang: Locale;
  dict: Dictionary;
}

export function HospitalList({ medicalSpecialties, lang, dict }: HospitalListProps) {
  const [selectedCategory, setSelectedCategory] = useState<MedicalSpecialtyType | 'ALL'>('ALL');

  // TanStack Query를 사용하여 best hospitals 데이터 페칭
  const {
    data: bestHospitals,
    isLoading,
    error,
  } = useBestHospitals({
    category: selectedCategory,
    limit: 5,
  });

  const handleViewAll = () => {
    // TODO: 전체보기 페이지로 이동하는 로직 구현
    console.log('View all hospitals for category:', selectedCategory);
  };

  const handleCategoryChange = (category: MedicalSpecialtyType | 'ALL') => {
    setSelectedCategory(category);
  };

  // 에러 상태 처리
  if (error) {
    return (
      <div className='w-full'>
        <div className='mb-4'>
          <HospitalListTitle lang={lang} dict={dict} onViewAll={handleViewAll} />
        </div>
        <div className='mb-4'>
          <HospitalListTabs
            lang={lang}
            dict={dict}
            medicalSpecialties={medicalSpecialties}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className='text-center text-red-500'>
          병원 데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <HospitalListTitle lang={lang} dict={dict} onViewAll={handleViewAll} />
      </div>

      <div className='mb-4'>
        <HospitalListTabs
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* 병원 리스트 표시 */}
      <div className=''>
        {isLoading ? (
          <HospitalListSkeleton />
        ) : bestHospitals ? (
          <HospitalListComponent hospitals={bestHospitals} dict={dict} lang={lang} />
        ) : null}
      </div>
    </div>
  );
}

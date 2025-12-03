'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { useBestHospitals } from 'entities/hospital/api/queries/get-best-hospitals';
import { HospitalListCarouselV2 } from './HospitalListCarouselV2';
import { HospitalListSkeleton } from './HospitalListSkeleton';

interface HospitalListCarouselV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: MedicalSpecialtyType | 'ALL';
  initialData?: HospitalCardData[];
}

function HospitalListCarouselV2Content({
  lang,
  dict,
  selectedCategory,
  initialData,
}: HospitalListCarouselV2WrapperProps) {
  const {
    data: bestHospitals,
    isLoading,
    error,
  } = useBestHospitals(
    {
      category: selectedCategory,
      limit: 10, // carousel용으로 충분한 수량
    },
    {
      // 서버에서 prefetch한 데이터를 초기 데이터로 사용 (ALL 카테고리일 때만)
      initialData: selectedCategory === 'ALL' ? initialData : undefined,
    },
  );

  if (isLoading) {
    return <div className='h-[300px]' />; // 로딩 중 스켈레톤 대신 공간만 확보
  }

  if (error || !bestHospitals || bestHospitals.length === 0) {
    return null;
  }

  return <HospitalListCarouselV2 hospitals={bestHospitals} lang={lang} dict={dict} />;
}

export function HospitalListCarouselV2Wrapper({
  lang,
  dict,
  selectedCategory,
  initialData,
}: HospitalListCarouselV2WrapperProps) {
  return (
    <Suspense fallback={<div className='h-[300px]' />}>
      <HospitalListCarouselV2Content
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        initialData={initialData}
      />
    </Suspense>
  );
}

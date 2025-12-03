'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import { type MedicalSpecialtyType } from '@prisma/client';
import { useBestHospitals } from 'entities/hospital/api/queries/get-best-hospitals';
import { HospitalListCarouselV2 } from './HospitalListCarouselV2';
import { HospitalListCarouselV2Skeleton } from './HospitalListCarouselV2Skeleton';

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
      limit: 5,
    },
    {
      // 서버에서 prefetch한 데이터를 초기 데이터로 사용 (ALL 카테고리일 때만)
      initialData: selectedCategory === 'ALL' ? initialData : undefined,
    },
  );

  if (isLoading) {
    return <HospitalListCarouselV2Skeleton />;
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
    <Suspense fallback={<HospitalListCarouselV2Skeleton />}>
      <HospitalListCarouselV2Content
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        initialData={initialData}
      />
    </Suspense>
  );
}

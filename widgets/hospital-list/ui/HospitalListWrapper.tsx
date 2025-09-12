import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalList } from './HospitalList';
import { HospitalListSkeleton } from './HospitalListSkeleton';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import {
  getBestHospitals,
  type GetBestHospitalsOptions,
} from 'entities/hospital/api/use-cases/get-best-hospitals';
import { type MedicalSpecialtyType } from '@prisma/client';

interface HospitalListWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function HospitalListContent({ lang, dict }: HospitalListWrapperProps) {
  // 카테고리별 병원 데이터를 미리 로드
  const categoriesData = await Promise.all([
    getBestHospitals({ category: 'ALL', limit: 5 }),
    getBestHospitals({ category: 'EYES', limit: 5 }),
    getBestHospitals({ category: 'NOSE', limit: 5 }),
    getBestHospitals({ category: 'LIFTING', limit: 5 }),
    getBestHospitals({ category: 'FACIAL_CONTOURING', limit: 5 }),
    getBestHospitals({ category: 'BREAST', limit: 5 }),
  ]);

  const hospitalsByCategory = {
    ALL: categoriesData[0],
    EYES: categoriesData[1],
    NOSE: categoriesData[2],
    LIFTING: categoriesData[3],
    FACIAL_CONTOURING: categoriesData[4],
    BREAST: categoriesData[5],
  };

  return <HospitalList hospitalsByCategory={hospitalsByCategory} lang={lang} dict={dict} />;
}

// 병원 데이터는 평점, 리뷰 등이 업데이트되므로 10분 캐시
export const revalidate = 600; // 10분 (600초)

export function HospitalListWrapper({ lang, dict }: HospitalListWrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <Suspense fallback={<HospitalListSkeleton />}>
        <HospitalListContent lang={lang} dict={dict} />
      </Suspense>
    </ErrorBoundary>
  );
}

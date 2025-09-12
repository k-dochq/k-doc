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
import {
  getMainMedicalSpecialties,
  type MedicalSpecialtyWithTranslations,
} from 'entities/hospital/api/use-cases/get-medical-specialties';
import { type MedicalSpecialtyType } from '@prisma/client';

interface HospitalListWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function HospitalListContent({ lang, dict }: HospitalListWrapperProps) {
  // 의료 전문 분야 데이터 조회
  const medicalSpecialties = await getMainMedicalSpecialties();

  return <HospitalList medicalSpecialties={medicalSpecialties} lang={lang} dict={dict} />;
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

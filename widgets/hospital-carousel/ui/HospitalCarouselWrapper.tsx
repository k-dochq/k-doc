import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalCarousel } from './HospitalCarousel';
import { HospitalCarouselSkeleton } from './HospitalCarouselSkeleton';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getBestHospitals } from 'entities/hospital/api/use-cases/get-best-hospitals';

interface HospitalCarouselWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function HospitalCarouselContent({ lang, dict }: HospitalCarouselWrapperProps) {
  const hospitals = await getBestHospitals();

  return <HospitalCarousel hospitals={hospitals} lang={lang} dict={dict} />;
}

// 병원 데이터는 평점, 리뷰 등이 업데이트되므로 10분 캐시
export const revalidate = 600; // 10분 (600초)

export function HospitalCarouselWrapper({ lang, dict }: HospitalCarouselWrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <Suspense fallback={<HospitalCarouselSkeleton />}>
        <HospitalCarouselContent lang={lang} dict={dict} />
      </Suspense>
    </ErrorBoundary>
  );
}

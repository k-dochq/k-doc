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

  console.log(hospitals);
  return <HospitalCarousel hospitals={hospitals} lang={lang} dict={dict} />;
}

export function HospitalCarouselWrapper({ lang, dict }: HospitalCarouselWrapperProps) {
  return (
    <ErrorBoundary
      fallback={
        <LocalizedErrorDisplay
          error={null}
          lang={lang}
          dict={dict}
          onRetry={() => window.location.reload()}
        />
      }
    >
      <Suspense fallback={<HospitalCarouselSkeleton />}>
        <HospitalCarouselContent lang={lang} dict={dict} />
      </Suspense>
    </ErrorBoundary>
  );
}

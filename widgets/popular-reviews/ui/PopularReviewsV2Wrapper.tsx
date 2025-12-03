import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PopularReviewsV2Container } from './PopularReviewsV2Container';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getMainMedicalSpecialties } from 'entities/hospital/api/use-cases/get-medical-specialties';

interface PopularReviewsV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function PopularReviewsV2Content({ lang, dict }: PopularReviewsV2WrapperProps) {
  const medicalSpecialties = await getMainMedicalSpecialties();

  return (
    <PopularReviewsV2Container lang={lang} dict={dict} medicalSpecialties={medicalSpecialties} />
  );
}

export function PopularReviewsV2Wrapper({ lang, dict }: PopularReviewsV2WrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <PopularReviewsV2Content lang={lang} dict={dict} />
    </ErrorBoundary>
  );
}

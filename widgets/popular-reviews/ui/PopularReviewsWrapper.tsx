import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PopularReviews } from './PopularReviews';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getMainMedicalSpecialties } from 'entities/hospital/api/use-cases/get-medical-specialties';

interface PopularReviewsWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function PopularReviewsContent({ lang, dict }: PopularReviewsWrapperProps) {
  const medicalSpecialties = await getMainMedicalSpecialties();

  return <PopularReviews medicalSpecialties={medicalSpecialties} lang={lang} dict={dict} />;
}

export function PopularReviewsWrapper({ lang, dict }: PopularReviewsWrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <PopularReviewsContent lang={lang} dict={dict} />
    </ErrorBoundary>
  );
}

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalList } from './HospitalList';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getMainMedicalSpecialties } from 'entities/hospital/api/use-cases/get-medical-specialties';

interface HospitalListWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function HospitalListContent({ lang, dict }: HospitalListWrapperProps) {
  const medicalSpecialties = await getMainMedicalSpecialties();

  return <HospitalList medicalSpecialties={medicalSpecialties} lang={lang} dict={dict} />;
}

export function HospitalListWrapper({ lang, dict }: HospitalListWrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <HospitalListContent lang={lang} dict={dict} />
    </ErrorBoundary>
  );
}

export const revalidate = 600;

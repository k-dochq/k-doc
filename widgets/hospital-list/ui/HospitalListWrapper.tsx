import { type Locale } from 'shared/config';
import { type Dictionary, type HospitalCardData } from 'shared/model/types';
import { HospitalList } from './HospitalList';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getMainMedicalSpecialties } from 'entities/hospital/api/use-cases/get-medical-specialties';

interface HospitalListWrapperProps {
  lang: Locale;
  dict: Dictionary;
  initialData?: HospitalCardData[];
}

async function HospitalListContent({ lang, dict, initialData }: HospitalListWrapperProps) {
  const medicalSpecialties = await getMainMedicalSpecialties();

  return (
    <HospitalList
      medicalSpecialties={medicalSpecialties}
      lang={lang}
      dict={dict}
      initialData={initialData}
    />
  );
}

export function HospitalListWrapper({ lang, dict, initialData }: HospitalListWrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <HospitalListContent lang={lang} dict={dict} initialData={initialData} />
    </ErrorBoundary>
  );
}

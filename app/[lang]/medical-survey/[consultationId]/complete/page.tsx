import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { MedicalSurveyCompleteContent } from 'features/medical-survey/ui/MedicalSurveyCompleteContent';

interface MedicalSurveyCompletePageProps {
  params: Promise<{
    lang: Locale;
    consultationId: string;
  }>;
}

export default async function MedicalSurveyCompletePage({
  params,
}: MedicalSurveyCompletePageProps) {
  const { lang, consultationId } = await params;
  const dict = await getDictionary(lang);

  return <MedicalSurveyCompleteContent lang={lang} dict={dict} consultationId={consultationId} />;
}

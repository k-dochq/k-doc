import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { MedicalSurveyContentV2 } from 'features/medical-survey/ui';

interface MedicalSurveyPageProps {
  params: Promise<{
    lang: Locale;
    consultationId: string;
  }>;
}

export default async function MedicalSurveyPage({ params }: MedicalSurveyPageProps) {
  const { lang, consultationId } = await params;
  const dict = await getDictionary(lang);

  return <MedicalSurveyContentV2 lang={lang} dict={dict} consultationId={consultationId} />;
}

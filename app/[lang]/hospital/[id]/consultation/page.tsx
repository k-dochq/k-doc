import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { ConsultationRequestForm } from 'features/consultation-request/ui/ConsultationRequestForm';

interface ConsultationRequestPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ConsultationRequestPage({ params }: ConsultationRequestPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <ConsultationRequestForm hospitalId={id} lang={lang} dict={dict} />;
}

import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { ConsultationRequestContentV2 } from 'features/consultation-request/ui/ConsultationRequestContentV2';

interface ConsultationRequestPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ConsultationRequestPage({ params }: ConsultationRequestPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <ConsultationRequestContentV2 hospitalId={id} lang={lang} dict={dict} />;
}

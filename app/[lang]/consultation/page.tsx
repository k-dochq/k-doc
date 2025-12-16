import { ConsultationContentV2 } from './ConsultationContentV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ConsultationPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ConsultationContentV2 lang={lang} dict={dict} />;
}

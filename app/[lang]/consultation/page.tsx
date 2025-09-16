import { ConsultationTabs } from 'features/consultation-tabs';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ConsultationPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ConsultationTabs lang={lang} dict={dict} />;
}

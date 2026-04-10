import { ConsultationContentV2 } from './ConsultationContentV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ConsultationPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ tab?: string }>;
}

function parseTab(value: string | undefined): 'chat' | 'appointment' {
  return value === 'appointment' ? 'appointment' : 'chat';
}

export default async function ConsultationPage({ params, searchParams }: ConsultationPageProps) {
  const { lang } = await params;
  const { tab } = await searchParams;
  const dict = await getDictionary(lang);

  return <ConsultationContentV2 lang={lang} dict={dict} initialTab={parseTab(tab)} />;
}

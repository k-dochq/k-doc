import { type Locale } from 'shared/config';
import { ConsultationChatContentV2 } from './ConsultationChatContentV2';
import { getDictionary } from '../../dictionaries';

interface ConsultationChatPageProps {
  params: Promise<{
    lang: Locale;
    hospitalId: string;
  }>;
}

export default async function ConsultationChatPage({ params }: ConsultationChatPageProps) {
  const { lang, hospitalId } = await params;
  const dict = await getDictionary(lang);

  return <ConsultationChatContentV2 lang={lang} hospitalId={hospitalId} dict={dict} />;
}

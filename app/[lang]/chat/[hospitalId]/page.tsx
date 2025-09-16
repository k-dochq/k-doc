import { type Locale } from 'shared/config';
import { ConsultationChatClient } from 'features/consultation-chat';
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

  return <ConsultationChatClient lang={lang} hospitalId={hospitalId} dict={dict} />;
}

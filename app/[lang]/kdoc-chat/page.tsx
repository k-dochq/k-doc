import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { KdocChatPage } from 'features/kdoc-consultation-chat/ui/KdocChatPage';

interface KdocChatPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function KdocChatRoutePage({ params }: KdocChatPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <KdocChatPage lang={lang} dict={dict} />;
}

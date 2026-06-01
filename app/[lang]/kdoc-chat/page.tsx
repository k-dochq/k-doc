import { type Locale } from 'shared/config';
import { KdocChatPage } from 'features/kdoc-consultation-chat/ui/KdocChatPage';

interface KdocChatPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function KdocChatRoutePage({ params }: KdocChatPageProps) {
  const { lang } = await params;
  return <KdocChatPage lang={lang} />;
}

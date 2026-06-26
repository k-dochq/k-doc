import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { KdocChatPage } from 'features/kdoc-consultation-chat/ui/KdocChatPage';

interface KdocChatRouteProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ threadId?: string }>;
}

export default async function KdocChatRoutePage({ params, searchParams }: KdocChatRouteProps) {
  const { lang } = await params;
  const { threadId } = await searchParams;
  const dict = await getDictionary(lang);
  return (
    <KdocChatPage
      lang={lang}
      dict={dict}
      initialThreadId={threadId ?? null}
    />
  );
}

import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { KdocConsultationHistoryPage } from 'features/kdoc-consultation-history/ui/KdocConsultationHistoryPage';

interface KdocConsultationHistoryRouteProps {
  params: Promise<{ lang: Locale }>;
}

export default async function KdocConsultationHistoryRoutePage({
  params,
}: KdocConsultationHistoryRouteProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <KdocConsultationHistoryPage lang={lang} dict={dict} />;
}

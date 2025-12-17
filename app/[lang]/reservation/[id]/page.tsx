import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { ReservationDetailContent } from './ReservationDetailContent';

interface ReservationDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function ReservationDetailPage({ params }: ReservationDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <ReservationDetailContent reservationId={id} lang={lang} dict={dict} />;
}

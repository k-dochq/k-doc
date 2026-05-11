import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { ReservationPolicyContent } from './ReservationPolicyContent';

interface ReservationPolicyPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: ReservationPolicyPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.footer.reservationPolicy} | K-DOC`,
    description: dict.footer.reservationPolicy,
    openGraph: {
      title: `${dict.footer.reservationPolicy} | K-DOC`,
      description: dict.footer.reservationPolicy,
    },
  };
}

export default async function ReservationPolicyPage({ params }: ReservationPolicyPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ReservationPolicyContent dict={dict} />;
}

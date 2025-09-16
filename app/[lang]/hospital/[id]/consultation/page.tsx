import { notFound } from 'next/navigation';
import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { ConsultationRequestForm } from 'features/consultation-request/ui/ConsultationRequestForm';

interface ConsultationRequestPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ConsultationRequestPage({ params }: ConsultationRequestPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <ConsultationRequestForm lang={lang} dict={dict} />;
}

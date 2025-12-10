import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { DoctorDetailContentV2 } from './DoctorDetailContentV2';

interface V2DoctorDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2DoctorDetailPage({ params }: V2DoctorDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <DoctorDetailContentV2 doctorId={id} lang={lang} dict={dict} />;
}

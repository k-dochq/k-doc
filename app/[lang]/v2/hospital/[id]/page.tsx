import { type Locale } from 'shared/config';
import { generateHospitalMetadata } from 'entities/hospital/lib/generate-hospital-metadata';
import { getDictionary } from '../../../dictionaries';
import { HospitalDetailContentV2 } from './HospitalDetailContentV2';

interface V2HospitalDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2HospitalDetailPage({ params }: V2HospitalDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <HospitalDetailContentV2 hospitalId={id} lang={lang} dict={dict} />;
}

export async function generateMetadata({ params }: V2HospitalDetailPageProps) {
  const { lang, id } = await params;
  return generateHospitalMetadata({ id, lang, basePath: 'v2/hospital' });
}

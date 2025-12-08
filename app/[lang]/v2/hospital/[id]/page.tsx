import { type Locale } from 'shared/config';
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

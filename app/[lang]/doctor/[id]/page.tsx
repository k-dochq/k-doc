import { type Locale } from 'shared/config';
import { generateDoctorMetadata } from 'entities/doctor/lib/generate-doctor-metadata';
import { getDictionary } from '../../dictionaries';
import { DoctorDetailContentV2 } from '../../v2/doctor/[id]/DoctorDetailContentV2';

interface DoctorDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <DoctorDetailContentV2 doctorId={id} lang={lang} dict={dict} />;
}

export async function generateMetadata({ params }: DoctorDetailPageProps) {
  const { lang, id } = await params;
  return generateDoctorMetadata({ id, lang, basePath: 'doctor' });
}

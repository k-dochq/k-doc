// import { type Locale } from 'shared/config';
// import { getDictionary } from '../../dictionaries';
// import { DoctorDetailContent } from './DoctorDetailContent';

// interface PageProps {
//   params: Promise<{
//     lang: Locale;
//     id: string;
//   }>;
// }

// export default async function DoctorDetailPage({ params }: PageProps) {
//   const { lang, id } = await params;
//   const dict = await getDictionary(lang);

//   return <DoctorDetailContent doctorId={id} lang={lang} dict={dict} />;
// }

import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { DoctorDetailContentV2 } from '../../v2/doctor/[id]/DoctorDetailContentV2';

interface V2DoctorDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2DoctorDetailPage({ params }: V2DoctorDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <DoctorDetailContentV2 doctorId={id} lang={lang} dict={dict} />;
}

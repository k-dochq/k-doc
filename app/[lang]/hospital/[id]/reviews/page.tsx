import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { HospitalReviewsContent } from 'features/hospital-reviews';

interface HospitalReviewsPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function HospitalReviewsPage({ params }: HospitalReviewsPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <HospitalReviewsContent hospitalId={id} lang={lang} dict={dict} />;
}

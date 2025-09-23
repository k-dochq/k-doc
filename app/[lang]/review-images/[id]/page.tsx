import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { ReviewImagesContent } from './ReviewImagesContent';

interface PageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ReviewImagesPage({ params }: PageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <ReviewImagesContent reviewId={id} lang={lang} dict={dict} />;
}

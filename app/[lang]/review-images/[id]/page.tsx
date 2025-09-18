import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { ReviewImagesContent } from './ReviewImagesContent';

interface PageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
  searchParams: Promise<{
    type?: string;
    index?: string;
  }>;
}

export default async function ReviewImagesPage({ params, searchParams }: PageProps) {
  const { lang, id } = await params;
  const { index } = await searchParams;
  const dict = await getDictionary(lang);

  return <ReviewImagesContent reviewId={id} lang={lang} initialIndex={index} dict={dict} />;
}

import { type Locale } from 'shared/config';
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

export default async function ReviewImagesPage({ params }: PageProps) {
  const { lang, id } = await params;

  return <ReviewImagesContent reviewId={id} lang={lang} />;
}

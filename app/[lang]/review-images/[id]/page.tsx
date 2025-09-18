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

export default async function ReviewImagesPage({ params, searchParams }: PageProps) {
  const { lang, id } = await params;
  const { type, index } = await searchParams;

  return (
    <ReviewImagesContent
      reviewId={id}
      lang={lang}
      initialImageType={type}
      initialImageIndex={index}
    />
  );
}

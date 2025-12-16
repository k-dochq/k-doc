import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { ReviewWriteContentV2 } from './ReviewWriteContentV2';

interface ReviewWritePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ hospitalId?: string }>;
}

export default async function ReviewWritePage({ params, searchParams }: ReviewWritePageProps) {
  const { lang } = await params;
  const { hospitalId } = await searchParams;
  const dict = await getDictionary(lang);

  return <ReviewWriteContentV2 lang={lang} dict={dict} hospitalId={hospitalId} />;
}

export async function generateMetadata({ params }: ReviewWritePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.reviewWrite?.form?.title || 'Write Review',
    description: dict.reviewWrite?.form?.ratingQuestion || 'Write a review for your procedure',
  };
}

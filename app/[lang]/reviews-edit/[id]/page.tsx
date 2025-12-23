import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { ReviewEditContentV2 } from './ReviewEditContentV2';

interface ReviewEditPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function ReviewEditPage({ params }: ReviewEditPageProps) {
  const { lang, id: reviewId } = await params;
  const dict = await getDictionary(lang);

  return <ReviewEditContentV2 lang={lang} dict={dict} reviewId={reviewId} />;
}

export async function generateMetadata({ params }: ReviewEditPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.reviewWrite?.form?.title || 'Edit Review',
    description: dict.reviewWrite?.form?.ratingQuestion || 'Edit your review',
  };
}

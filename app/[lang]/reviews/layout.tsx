import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { ReviewsLayoutClient } from './ReviewsLayoutClient';

interface ReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewsLayout({ children, params }: ReviewsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ReviewsLayoutClient lang={lang} dict={dict}>{children}</ReviewsLayoutClient>;
}

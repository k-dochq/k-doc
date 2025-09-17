import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { ReviewDetailPage as ReviewDetailPageComponent } from './ReviewDetailPage';
import { ReviewDetailSkeleton } from './ReviewDetailSkeleton';

interface PageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ReviewDetailPage({ params }: PageProps) {
  const { lang, id } = await params;

  try {
    // 즉시 렌더링 가능한 데이터만 먼저 로드
    const dict = await getDictionary(lang);

    return (
      <Suspense fallback={<ReviewDetailSkeleton />}>
        <ReviewDetailPageComponent reviewId={id} lang={lang} dict={dict} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading review detail page:', error);
    notFound();
  }
}

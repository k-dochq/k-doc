import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalReviews } from 'entities/review';
import { HospitalReviewsInfiniteList } from './HospitalReviewsInfiniteList';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';

interface HospitalReviewsContentProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export async function HospitalReviewsContent({
  hospitalId,
  lang,
  dict,
}: HospitalReviewsContentProps) {
  try {
    // 초기 리뷰 데이터 로드
    const initialReviews = await getHospitalReviews({ hospitalId, limit: 10 });

    return (
      <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
        <HospitalReviewsInfiniteList
          hospitalId={hospitalId}
          lang={lang}
          dict={dict}
          initialData={initialReviews}
        />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error loading hospital reviews:', error);
    return <LocalizedErrorDisplay error={error as Error} lang={lang} dict={dict} />;
  }
}

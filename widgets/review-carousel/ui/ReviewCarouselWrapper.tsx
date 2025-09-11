'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalReviews } from 'entities/review';
import { ReviewCarousel } from './ReviewCarousel';
import { ReviewCarouselSkeleton } from './ReviewCarouselSkeleton';
import { ReviewCarouselError } from './ReviewCarouselError';
import { ErrorBoundary } from 'shared/ui/error-display';

interface ReviewCarouselWrapperProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewCarouselWrapper({ hospitalId, lang, dict }: ReviewCarouselWrapperProps) {
  const { data, isLoading, error } = useHospitalReviews({
    hospitalId,
    page: 1,
    limit: 10,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <ReviewCarouselSkeleton />;
  }

  // 에러 상태 처리
  if (error) {
    return <ReviewCarouselError lang={lang} dict={dict} />;
  }

  // 데이터가 없는 경우
  if (!data?.data?.reviews || data.data.reviews.length === 0) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-center'>
          <p className='text-gray-500'>아직 등록된 리뷰가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<ReviewCarouselError lang={lang} dict={dict} />}>
      <ReviewCarousel reviews={data.data.reviews} hospitalId={hospitalId} lang={lang} dict={dict} />
    </ErrorBoundary>
  );
}

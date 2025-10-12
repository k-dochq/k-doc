'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalReviews, usePrefetchHospitalReviews } from 'entities/review';
import { ReviewCarousel } from 'shared/ui/review-carousel';
import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';
import { LocaleLink } from 'shared/ui/locale-link';
import { HospitalDetailReviewsLoading } from './HospitalDetailReviewsLoading';
import { HospitalDetailReviewsError } from './HospitalDetailReviewsError';

interface HospitalDetailReviewsProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  excludeReviewId?: string;
  title?: string;
}

/**
 * 병원 리뷰 후기 섹션 컴포넌트
 */
export function HospitalDetailReviews({
  hospitalId,
  lang,
  dict,
  excludeReviewId,
  title,
}: HospitalDetailReviewsProps) {
  // 병원 리뷰 무한 스크롤 데이터 prefetch
  usePrefetchHospitalReviews({
    hospitalId,
    enabled: !!hospitalId,
  });

  // TanStack Query로 리뷰 데이터 요청
  const {
    data: reviewsData,
    isLoading,
    error,
    refetch,
  } = useHospitalReviews({
    hospitalId,
    page: 1,
    limit: 5, // 최근 5개 리뷰만 표시
    excludeReviewId,
  });

  const handleRetry = () => {
    // TanStack Query의 refetch를 사용하여 재시도
    refetch();
  };

  if (isLoading) {
    return <HospitalDetailReviewsLoading />;
  }

  if (error) {
    return <HospitalDetailReviewsError lang={lang} dict={dict} onRetry={handleRetry} />;
  }

  const reviews = reviewsData?.data?.reviews || [];

  return (
    <div className=''>
      {/* 섹션 헤더 */}
      <div className='flex items-center justify-between px-5'>
        <div className='flex items-center gap-1'>
          <h2 className='text-base leading-6 font-bold'>
            {title || dict.hospitalDetailReviews.title}
          </h2>
        </div>

        <LocaleLink
          href={`/hospital/${hospitalId}/reviews`}
          className='flex items-center gap-0.5 transition-opacity hover:opacity-80'
        >
          <span className='text-[13px] leading-[18px] font-medium'>
            {dict.hospitalDetailReviews.viewAll}
          </span>
          <div className='flex items-center justify-center'>
            <ArrowRightIcon className='' />
          </div>
        </LocaleLink>
      </div>

      {/* 리뷰 목록 */}
      <div className='mt-4'>
        <ReviewCarousel
          items={reviews}
          lang={lang}
          dict={dict}
          emptyMessage={dict.hospitalDetailReviews.emptyMessage}
          loop={true}
          align='start'
          basis='basis-[280px] md:basis-[320px]'
          noBorder={true}
        />
      </div>
    </div>
  );
}

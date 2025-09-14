'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalReviews } from 'entities/review';
import { ArrowRightIcon } from 'shared/ui/arrow-right-icon';
import { HospitalDetailReviewsLoading } from './HospitalDetailReviewsLoading';
import { HospitalDetailReviewsError } from './HospitalDetailReviewsError';

interface HospitalDetailReviewsProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 병원 리뷰 후기 섹션 컴포넌트
 */
export function HospitalDetailReviews({ hospitalId, lang, dict }: HospitalDetailReviewsProps) {
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
  const reviewCount = reviewsData?.data?.total || 0;

  return (
    <div className=''>
      {/* 섹션 헤더 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <h2 className='text-base leading-6 font-bold text-white'>시술후기</h2>
          <span className='text-sm leading-[18px] font-semibold text-white'>({reviewCount})</span>
        </div>

        <button className='flex items-center gap-0.5'>
          <span className='text-sm leading-[18px] font-medium text-white'>전체보기</span>
          <div className='flex items-center justify-center'>
            <ArrowRightIcon className='text-white' />
          </div>
        </button>
      </div>

      {/* 리뷰 목록 */}
      <div className='mt-4 space-y-4'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className='rounded-lg bg-white/10 p-4'>
              <p className='text-sm text-white'>리뷰 ID: {review.id}</p>
              <p className='text-sm text-white/80'>평점: {review.rating}</p>
              <p className='text-sm text-white/80'>
                작성자: {review.user.displayName || review.user.nickName}
              </p>
            </div>
          ))
        ) : (
          <p className='text-sm text-white/80'>아직 등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

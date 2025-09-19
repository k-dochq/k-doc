'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { ReviewLikeButton } from 'features/review-like/ui/ReviewLikeButton';
import { PageHeader } from 'shared/ui/page-header';
import { ReviewListCardHeader } from './ReviewListCardHeader';
import { ReviewListImages } from './ReviewListImages';
import { ReviewListCardFooter } from './ReviewListCardFooter';
import { ReviewContentSection } from './ReviewContentSection';
import { ReviewStatsSection } from './ReviewStatsSection';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { ReviewHospitalSection } from 'entities/review';
import { HospitalDetailReviews } from 'widgets/hospital-detail-reviews';
import { ReviewCommentsSection } from 'features/review-comments';
import { StarBackground } from './StarBackground';

interface ReviewDetailContentProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailContent({ review, lang, dict }: ReviewDetailContentProps) {
  const title = dict.reviewDetail?.title || '시술후기';
  const content = extractLocalizedText(review.content, lang);

  return (
    <div className=''>
      {/* 헤더 */}
      <PageHeader
        lang={lang}
        title={title}
        fallbackUrl={`/${lang}/reviews`}
        variant='light'
        rightContent={
          <ReviewLikeButton
            reviewId={review.id}
            locale={lang}
            dict={dict}
            variant='compact'
            showCount={true}
          />
        }
      />

      <div className='p-5'>
        <div className=''>
          {/* 리뷰 컨텐츠 */}
          <div className='rounded-t-xl border border-white bg-white/50 p-5'>
            {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
            <ReviewListCardHeader review={review} lang={lang} />

            {/* 두 번째 섹션: Before/After 이미지 */}
            <ReviewListImages
              beforeImages={review.images.before}
              afterImages={review.images.after}
              reviewId={review.id}
              lang={lang}
              className='mt-3'
            />

            {/* 세 번째 섹션: 해시태그, 시술시기 */}
            <ReviewListCardFooter review={review} lang={lang} dict={dict} className='mt-3' />

            {/* 네 번째 섹션: 리뷰 내용 */}
            {content && (
              <ReviewContentSection
                content={content}
                lang={lang}
                dict={dict}
                className='mt-3'
                enableExpand={false}
              />
            )}

            {/* 다섯 번째 섹션: 병원 정보 */}
            <ReviewHospitalSection review={review} lang={lang} dict={dict} />
          </div>
          {/* 여섯 번째 섹션: 조회수만 표시 (좋아요는 헤더에 있음) */}
          <ReviewStatsSection review={review} lang={lang} user={null} showLikeButton={false} />
        </div>

        {/* 일곱 번째 섹션: 같은 병원의 다른 시술후기 */}
      </div>

      {/* 별 이미지 섹션 */}
      <div className='relative'>
        <StarBackground />
      </div>

      <div className='mt-2 p-5'>
        <HospitalDetailReviews
          hospitalId={review.hospital.id}
          lang={lang}
          dict={dict}
          excludeReviewId={review.id}
          title={dict.reviewDetail?.sameHospitalReviews || '같은 시술 후기'}
        />
      </div>

      <ReviewCommentsSection reviewId={review.id} lang={lang} dict={dict} />
    </div>
  );
}

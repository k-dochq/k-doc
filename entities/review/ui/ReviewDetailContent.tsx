'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { ReviewLikeButton } from 'features/review-like/ui/ReviewLikeButton';
import { DetailHeader } from 'shared/ui/detail-header';
import { ReviewListCardHeader } from './ReviewListCardHeader';
import { ReviewListImages } from './ReviewListImages';
import { ReviewListCardFooter } from './ReviewListCardFooter';
import { ReviewContentSection } from './ReviewContentSection';
import { ReviewStatsSection } from './ReviewStatsSection';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { ReviewHospitalSection } from 'entities/review';

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
      <DetailHeader
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
            size='md'
          />
        }
      />

      {/* 리뷰 컨텐츠 */}
      <div className='px-5 py-4'>
        {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
        <ReviewListCardHeader review={review} lang={lang} />

        {/* 두 번째 섹션: Before/After 이미지 */}
        <ReviewListImages
          beforeImages={review.images.before}
          afterImages={review.images.after}
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

        {/* 여섯 번째 섹션: 조회수만 표시 (좋아요는 헤더에 있음) */}
        <ReviewStatsSection
          review={review}
          lang={lang}
          user={null}
          showLikeButton={false}
          className='mt-3'
        />
      </div>
    </div>
  );
}

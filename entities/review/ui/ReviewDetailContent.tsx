'use client';

import { useEffect } from 'react';
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
import { decodeHtmlEntities } from 'shared/lib/html-entities';
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
  const content = decodeHtmlEntities(extractLocalizedText(review.content, lang) || '');

  // URL 해시에 따라 자동 스크롤
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // 약간의 지연을 두고 스크롤 (DOM이 완전히 로드된 후)
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

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
        <div className='shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] rounded-xl overflow-hidden'>
          {/* 리뷰 컨텐츠 */}
          <div className='rounded-t-xl border border-white bg-white/50 p-5 backdrop-blur-[6px]'>
            {/* 첫 번째 섹션: 프로필 사진, 닉네임, 작성일자, 평점 */}
            <ReviewListCardHeader review={review} lang={lang} />

            {/* 두 번째 섹션: Before/After 이미지 */}
            <ReviewListImages
              beforeImages={review.images.before}
              afterImages={review.images.after}
              reviewId={review.id}
              lang={lang}
              dict={dict}
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
          </div>
          {/* 여섯 번째 섹션: 조회수만 표시 (좋아요는 헤더에 있음) */}
          <ReviewStatsSection review={review} lang={lang} user={null} showLikeButton={false} />
        </div>
      </div>

      {/* 시술 병원 섹션 - 리뷰 영역 밖으로 분리 */}
      <div className='px-5 mt-7'>
        <ReviewHospitalSection review={review} lang={lang} dict={dict} />
      </div>

      {/* 별 이미지 섹션 */}
      <div className='relative'>
        <StarBackground />
      </div>

      <div className='mt-7 py-5'>
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

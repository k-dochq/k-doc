'use client';

import { type Locale } from 'shared/config';
import { type ReviewCardData } from '../model/types';
import { extractLocalizedText, getUserDisplayName } from 'shared/lib';
import { BeforeAfterImages } from './BeforeAfterImages';
import { UserRatingInfo } from './UserRatingInfo';
import { ReviewText } from './ReviewText';
import { ReviewHashtags } from './ReviewHashtags';
import { ReviewHospitalInfo } from './ReviewHospitalInfo';
import { LocaleLink } from 'shared/ui/locale-link';

interface PopularReviewCardProps {
  review: ReviewCardData;
  lang: Locale;
  className?: string;
  noBorder?: boolean;
}

export function PopularReviewCard({
  review,
  lang,
  className = '',
  noBorder = false,
}: PopularReviewCardProps) {
  const title = extractLocalizedText(review.title, lang) || '';
  const content = extractLocalizedText(review.content, lang) || '';

  // 사용자 표시명
  const userName = getUserDisplayName(review.user);

  // 해시태그 추출 (concerns를 해시태그로 사용)
  const hashtags = review.concerns ? [review.concerns] : [];

  return (
    <LocaleLink
      href={`/reviews/${review.id}`}
      locale={lang}
      className={`block w-full overflow-hidden rounded-lg bg-white ${noBorder ? '' : 'border border-neutral-200'} ${className}`}
    >
      {/* Before/After 이미지 */}
      <div className=''>
        <BeforeAfterImages beforeImages={review.images.before} afterImages={review.images.after} />
      </div>
      <div className='p-4'>
        {/* 사용자 정보 및 평점 */}
        <UserRatingInfo userName={userName} rating={review.rating} />

        <div className='h-2' />

        {/* 리뷰 텍스트 */}
        {content && <ReviewText text={content} maxLines={3} />}

        <div className='h-2' />

        {/* 해시태그 */}
        {hashtags.length > 0 && <ReviewHashtags hashtags={hashtags} />}

        <div className='h-2' />

        {/* 병원 정보 */}
        <ReviewHospitalInfo districtName={review.hospital.district.name} lang={lang} />
      </div>
    </LocaleLink>
  );
}

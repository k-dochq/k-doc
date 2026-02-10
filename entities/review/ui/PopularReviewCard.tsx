'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { extractLocalizedText, getUserDisplayName } from 'shared/lib';
import { decodeHtmlEntities } from 'shared/lib/html-entities';
import { BeforeAfterImages } from './BeforeAfterImages';
import { UserRatingInfo } from './UserRatingInfo';
import { ReviewText } from './ReviewText';
import { ReviewHashtags } from './ReviewHashtags';
import { ReviewHospitalInfo } from './ReviewHospitalInfo';
import { LocaleLink } from 'shared/ui/locale-link';
import { useReviewClickGuard } from '../model/useReviewClickGuard';

interface PopularReviewCardProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
  noBorder?: boolean;
  blockedMessage?: string;
}

export function PopularReviewCard({
  review,
  lang,
  dict,
  className = '',
  noBorder = false,
  blockedMessage,
}: PopularReviewCardProps) {
  const handleClick = useReviewClickGuard(
    review.hospital?.approvalStatusType,
    blockedMessage,
  );
  const title = decodeHtmlEntities(extractLocalizedText(review.title, lang) || '');
  const content = decodeHtmlEntities(extractLocalizedText(review.content, lang) || '');

  // 사용자 표시명
  const userName = getUserDisplayName(review.user);

  // 해시태그 추출 (concernsMultilingual을 해시태그로 사용)
  const concerns = extractLocalizedText(review.concernsMultilingual, lang) || '';
  const hashtags = concerns ? [concerns] : [];

  // 이미지가 모두 없는지 확인
  const hasNoImages = review.images.before.length === 0 && review.images.after.length === 0;

  return (
    <LocaleLink
      href={`/review/${review.id}`}
      locale={lang}
      className={`block h-full w-full overflow-hidden rounded-lg bg-white ${noBorder ? '' : 'border border-neutral-200'}`}
      onClick={handleClick}
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
        {content && <ReviewText text={content} maxLines={hasNoImages ? 8 : 3} />}

        <div className='h-2' />

        {/* 해시태그 */}
        {hashtags.length > 0 && <ReviewHashtags hashtags={hashtags} />}

        <div className='h-2' />

        {/* 병원 정보 */}
        <ReviewHospitalInfo
          districtName={
            review.hospital.displayLocationName ||
            review.hospital.district.displayName ||
            review.hospital.district.name
          }
          hospitalName={review.hospital.name}
          lang={lang}
          dict={dict}
        />
      </div>
    </LocaleLink>
  );
}

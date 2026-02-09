'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { extractLocalizedText, getUserDisplayName } from 'shared/lib';
import { decodeHtmlEntities } from 'shared/lib/html-entities';
import { LocaleLink } from 'shared/ui/locale-link';
import { PopularReviewCardV2BeforeAfter } from './PopularReviewCardV2BeforeAfter';
import { PopularReviewCardV2UserInfo } from './PopularReviewCardV2UserInfo';
import { PopularReviewCardV2Location } from './PopularReviewCardV2Location';
import { PopularReviewCardV2Content } from './PopularReviewCardV2Content';
import { PopularReviewCardV2Hashtags } from './PopularReviewCardV2Hashtags';
import { useReviewClickGuard } from '../model/useReviewClickGuard';

interface PopularReviewCardV2Props {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
  className?: string;
  blockedMessage?: string;
}

export function PopularReviewCardV2({
  review,
  lang,
  dict,
  className = '',
  blockedMessage,
}: PopularReviewCardV2Props) {
  const handleClick = useReviewClickGuard(
    review.hospital?.approvalStatusType,
    blockedMessage,
  );
  const content = decodeHtmlEntities(extractLocalizedText(review.content, lang) || '');

  // 사용자 표시명
  const userName = getUserDisplayName(review.user);

  // 해시태그 추출 (concernsMultilingual을 해시태그로 사용)
  const concerns = extractLocalizedText(review.concernsMultilingual, lang) || '';
  const hashtags = concerns ? [concerns] : [];

  // 지역 정보
  const districtName =
    review.hospital.displayLocationName ||
    review.hospital.district.displayName ||
    review.hospital.district.name;
  const district = extractLocalizedText(districtName, lang) || '';
  const hospitalName = extractLocalizedText(review.hospital.name, lang) || '';

  // Before/After 이미지
  const beforeImage = review.images.before.length > 0 ? review.images.before[0] : null;
  const afterImage = review.images.after.length > 0 ? review.images.after[0] : null;
  const hasImages = beforeImage !== null || afterImage !== null;
  const hasNoImages = review.images.before.length === 0 && review.images.after.length === 0;

  return (
    <LocaleLink
      href={`/review/${review.id}`}
      locale={lang}
      className={`block h-full w-full overflow-hidden rounded-xl bg-white shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] ${className}`}
      onClick={handleClick}
    >
      {/* Before/After 이미지 영역 */}
      {hasImages && (
        <PopularReviewCardV2BeforeAfter beforeImage={beforeImage} afterImage={afterImage} />
      )}

      {/* 텍스트 영역 */}
      <div
        className={`flex w-full flex-col gap-4 p-4 ${hasImages ? 'border-t border-neutral-200' : ''}`}
      >
        {/* 사용자 정보 및 평점 */}
        <PopularReviewCardV2UserInfo userName={userName} rating={review.rating} />

        {/* 구분선 */}
        <div className='h-0 w-full'>
          <div className='h-px w-full bg-neutral-200' />
        </div>

        {/* 지역 | 병원명 및 리뷰 내용 */}
        <div className='flex w-full flex-col gap-2'>
          {/* 지역 | 병원명 */}
          <PopularReviewCardV2Location
            regionLabel={dict.hospital.region}
            district={district}
            hospitalName={hospitalName}
          />

          {/* 리뷰 내용 (한 줄 넘어가면 ellipsis) */}
          <PopularReviewCardV2Content content={content} maxLines={hasNoImages ? 8 : 3} />

          {/* 해시태그 */}
          <PopularReviewCardV2Hashtags hashtags={hashtags} />
        </div>
      </div>
    </LocaleLink>
  );
}

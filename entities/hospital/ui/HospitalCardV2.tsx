import { type HospitalCardData, type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { getLocalizedTextByLocale } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { HotRibbonV2 } from 'shared/ui/hot-ribbon';
import { BestRibbonV2 } from 'shared/ui/best-ribbon';
import { HospitalCardV2Thumbnail } from './HospitalCardV2Thumbnail';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags';
import { HospitalCardV2NameAndLocation } from './HospitalCardV2NameAndLocation';
import { HospitalCardV2Price } from './HospitalCardV2Price';
import { HospitalCardV2Rating } from './HospitalCardV2Rating';
import { addCategoryToHospitalCardData } from '../lib/add-hospital-category';

interface HospitalCardV2Props {
  hospital: HospitalCardData;
  lang: Locale;
  dict: Dictionary;
  user?: User | null;
  onToggleLike?: (hospitalId: string) => void;
  isLikeLoading?: boolean;
  showLikeButton?: boolean;
  href?: string; // 외부에서 링크를 제어할 수 있도록 추가
}

export function HospitalCardV2({
  hospital,
  lang,
  dict,
  user,
  onToggleLike,
  isLikeLoading = false,
  showLikeButton = false,
  href,
}: HospitalCardV2Props) {
  // 추가 카테고리가 포함된 병원 데이터
  const hospitalWithCategory = addCategoryToHospitalCardData(hospital);

  const hospitalName = getLocalizedTextByLocale(hospitalWithCategory.name, lang);
  const displayLocationName = hospitalWithCategory.displayLocationName
    ? getLocalizedTextByLocale(hospitalWithCategory.displayLocationName, lang)
    : null;
  const address = getLocalizedTextByLocale(hospitalWithCategory.address, lang);

  // 가격 포맷팅
  const price = hospitalWithCategory.prices?.minPrice
    ? `$${hospitalWithCategory.prices.minPrice.toLocaleString()}~`
    : '';

  // 지역 정보 (displayLocationName이 있으면 사용)
  const location = displayLocationName || address;

  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked =
    user && hospitalWithCategory.likedUserIds
      ? hospitalWithCategory.likedUserIds.includes(user.id)
      : false;

  // 좋아요 토글 핸들러
  const handleToggleLike = () => {
    onToggleLike?.(hospitalWithCategory.id);
  };

  // 뱃지 로직: badge 배열의 첫 번째 요소 확인
  const firstBadge = hospitalWithCategory.badge?.[0];

  // 링크 URL 결정: href prop이 제공되면 사용, 없으면 기본값 사용 (locale prefix 없이 전달)
  const linkHref = href || `/hospital/${hospitalWithCategory.id}`;

  return (
    <LocaleLink href={linkHref} className='block'>
      <div className='relative'>
        {/* 뱃지 표시 */}
        {firstBadge === 'HOT' && <HotRibbonV2 />}
        {firstBadge === 'BEST' && <BestRibbonV2 />}

        {/* 카드 컨테이너 */}
        <div className='flex flex-col items-center overflow-clip rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'>
          {/* 썸네일 이미지 */}
          <HospitalCardV2Thumbnail
            imageUrl={hospitalWithCategory.thumbnailImageUrl}
            alt={hospitalName}
            showLikeButton={showLikeButton}
            isLiked={isLiked}
            onToggleLike={handleToggleLike}
            isLikeLoading={isLikeLoading}
          />

          {/* 콘텐츠 영역 */}
          <div className='flex h-[160px] w-full shrink-0 flex-col items-start gap-1 p-3'>
            {/* 상단 영역 */}
            <div className='flex w-full shrink-0 flex-col items-start gap-1.5'>
              {/* 카테고리 태그 */}
              {hospitalWithCategory.medicalSpecialties &&
                hospitalWithCategory.medicalSpecialties.length > 0 && (
                  <MedicalSpecialtyTagsV2
                    specialties={hospitalWithCategory.medicalSpecialties}
                    lang={lang}
                    maxDisplay={3}
                  />
                )}

              {/* 제목 및 지역 */}
              <HospitalCardV2NameAndLocation
                hospitalName={hospitalName}
                location={location}
                dict={dict}
              />
            </div>

            {/* 하단 영역 */}
            <div className='flex w-full shrink-0 flex-col items-start gap-0.5'>
              {/* 가격 */}
              <HospitalCardV2Price price={price} />

              {/* 별점 및 리뷰 */}
              <HospitalCardV2Rating
                rating={hospitalWithCategory.rating}
                reviewCount={hospitalWithCategory.reviewCount}
              />
            </div>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}

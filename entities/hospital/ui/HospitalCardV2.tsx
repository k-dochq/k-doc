import { type HospitalCardData, type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { getLocalizedTextByLocale } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { HotRibbonV2 } from 'shared/ui/hot-ribbon';
import { HospitalCardV2Thumbnail } from './HospitalCardV2Thumbnail';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags';
import { HospitalCardV2NameAndLocation } from './HospitalCardV2NameAndLocation';
import { HospitalCardV2Price } from './HospitalCardV2Price';
import { HospitalCardV2Rating } from './HospitalCardV2Rating';

interface HospitalCardV2Props {
  hospital: HospitalCardData;
  lang: Locale;
  dict: Dictionary;
  showHotTag?: boolean;
  user?: User | null;
  onToggleLike?: (hospitalId: string) => void;
  isLikeLoading?: boolean;
  showLikeButton?: boolean;
}

export function HospitalCardV2({
  hospital,
  lang,
  dict,
  showHotTag = true,
  user,
  onToggleLike,
  isLikeLoading = false,
  showLikeButton = false,
}: HospitalCardV2Props) {
  const hospitalName = getLocalizedTextByLocale(hospital.name, lang);
  const displayLocationName = hospital.displayLocationName
    ? getLocalizedTextByLocale(hospital.displayLocationName, lang)
    : null;
  const address = getLocalizedTextByLocale(hospital.address, lang);

  // 가격 포맷팅
  const price = hospital.prices?.minPrice ? `$${hospital.prices.minPrice.toLocaleString()}~` : '';

  // 지역 정보 (displayLocationName이 있으면 사용)
  const location = displayLocationName || address;

  // 클라이언트에서 현재 사용자의 좋아요 상태 계산
  const isLiked = user && hospital.likedUserIds ? hospital.likedUserIds.includes(user.id) : false;

  // 좋아요 토글 핸들러
  const handleToggleLike = () => {
    onToggleLike?.(hospital.id);
  };

  return (
    <LocaleLink href={`/hospital/${hospital.id}`} locale={lang} className='block'>
      <div className='relative'>
        {/* HOT 태그 */}
        {showHotTag && <HotRibbonV2 />}

        {/* 카드 컨테이너 */}
        <div className='flex flex-col items-center overflow-clip rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'>
          {/* 썸네일 이미지 */}
          <HospitalCardV2Thumbnail
            imageUrl={hospital.thumbnailImageUrl}
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
              {hospital.medicalSpecialties && hospital.medicalSpecialties.length > 0 && (
                <MedicalSpecialtyTagsV2
                  specialties={hospital.medicalSpecialties}
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
              <HospitalCardV2Rating rating={hospital.rating} reviewCount={hospital.reviewCount} />
            </div>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}

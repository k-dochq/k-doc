import { type HospitalCardData, type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { getLocalizedTextByLocale } from 'shared/model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { HotRibbonV2 } from 'shared/ui/hot-ribbon';
import { HospitalCardV2Thumbnail } from './HospitalCardV2Thumbnail';
import { HospitalCardV2CategoryTag } from './HospitalCardV2CategoryTag';
import { HospitalCardV2NameAndLocation } from './HospitalCardV2NameAndLocation';
import { HospitalCardV2Price } from './HospitalCardV2Price';
import { HospitalCardV2Rating } from './HospitalCardV2Rating';

interface HospitalCardV2Props {
  hospital: HospitalCardData;
  lang: Locale;
  dict: Dictionary;
  showHotTag?: boolean;
}

export function HospitalCardV2({ hospital, lang, dict, showHotTag = true }: HospitalCardV2Props) {
  const hospitalName = getLocalizedTextByLocale(hospital.name, lang);
  const displayLocationName = hospital.displayLocationName
    ? getLocalizedTextByLocale(hospital.displayLocationName, lang)
    : null;
  const address = getLocalizedTextByLocale(hospital.address, lang);

  // 첫 번째 medical specialty를 카테고리 태그로 사용
  const categoryTag = hospital.medicalSpecialties?.[0]
    ? getLocalizedTextByLocale(hospital.medicalSpecialties[0].name, lang)
    : '';

  // 가격 포맷팅
  const price = hospital.prices?.minPrice ? `$${hospital.prices.minPrice.toLocaleString()}~` : '';

  // 지역 정보 (displayLocationName이 있으면 사용)
  const location = displayLocationName || address;

  return (
    <LocaleLink href={`/hospital/${hospital.id}`} locale={lang} className='block'>
      <div className='relative'>
        {/* HOT 태그 */}
        {showHotTag && <HotRibbonV2 />}

        {/* 카드 컨테이너 */}
        <div className='flex flex-col items-center overflow-clip rounded-xl bg-white shadow-[1px_2px_4px_0_rgba(0,0,0,0.40)]'>
          {/* 썸네일 이미지 */}
          <HospitalCardV2Thumbnail imageUrl={hospital.thumbnailImageUrl} alt={hospitalName} />

          {/* 콘텐츠 영역 */}
          <div className='flex h-[160px] w-full shrink-0 flex-col items-start gap-1 p-3'>
            {/* 상단 영역 */}
            <div className='flex w-full shrink-0 flex-col items-start gap-1.5'>
              {/* 카테고리 태그 */}
              {categoryTag && <HospitalCardV2CategoryTag categoryName={categoryTag} />}

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

import {
  type LocalizedText,
  type PriceInfo,
  getLocalizedTextByLocale,
  type MedicalSpecialty,
} from 'shared/model/types';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { StarIcon } from 'shared/ui/star-icon';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';
import { HeartIcon } from 'shared/ui/icons/HeartIcon';

interface HospitalInfoProps {
  name: LocalizedText;
  address: LocalizedText;
  prices: PriceInfo | null;
  rating: number;
  reviewCount: number;
  discountRate: number | null;
  medicalSpecialties?: MedicalSpecialty[];
  likeCount?: number;
  dict: Dictionary;
  lang: Locale;
}

export function HospitalInfo({
  name,
  address,
  prices,
  rating,
  reviewCount,
  discountRate,
  medicalSpecialties,
  likeCount,
  dict,
  lang,
}: HospitalInfoProps) {
  return (
    <div className='flex min-w-0 flex-1 flex-col justify-center gap-1'>
      {/* 지역 정보 */}
      <div className='flex min-w-0 items-center gap-1 text-xs font-medium text-neutral-500'>
        <span className='shrink-0'>{dict.hospital.region}</span>
        <div className='h-2.5 w-px shrink-0 bg-neutral-500'></div>
        <span className='min-w-0'>{getLocalizedTextByLocale(address, lang)}</span>
      </div>

      {/* 병원명 */}
      <div className='min-w-0'>
        <h3 className='truncate text-sm font-semibold text-neutral-900'>
          {getLocalizedTextByLocale(name, lang)}
        </h3>
      </div>

      {/* 가격 정보 - 가격이 있을 때만 표시 */}
      {prices?.minPrice && (
        <div className='flex items-center gap-1'>
          <span className='shrink-0 text-base font-semibold text-neutral-900'>
            ${prices.minPrice.toLocaleString()}~
          </span>
          {discountRate != null && discountRate > 0 && (
            <div className='flex shrink-0 items-center justify-center rounded-[4px] bg-[#0B99FF] px-1 py-0.5 text-xs font-semibold text-white'>
              {discountRate}% OFF
            </div>
          )}
        </div>
      )}

      {/* 시술부위 태그 */}
      {medicalSpecialties && medicalSpecialties.length > 0 && (
        <MedicalSpecialtyTags specialties={medicalSpecialties} lang={lang} maxDisplay={3} />
      )}

      {/* 평점 정보 */}
      <div className='flex min-w-0 items-center gap-1'>
        <div className='flex min-w-0 gap-0.5'>
          <StarIcon width={16} height={16} />
          <span className='min-w-0 truncate text-xs font-medium text-neutral-900'>
            {rating.toFixed(1)} <span className='text-neutral-400'>({reviewCount})</span>
          </span>
        </div>

        {/* 좋아요 정보 */}
        {likeCount !== undefined && likeCount > 0 && (
          <div className='flex items-center gap-0.5'>
            <HeartIcon width={16} height={16} />
            <span className='text-xs font-medium text-neutral-900'>{likeCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

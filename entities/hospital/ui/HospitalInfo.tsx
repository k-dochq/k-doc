import {
  type LocalizedText,
  type PriceInfo,
  getLocalizedTextByLocale,
} from 'shared/model/types/common';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';

interface HospitalInfoProps {
  name: LocalizedText;
  address: LocalizedText;
  prices: PriceInfo | null;
  rating: number;
  reviewCount: number;
  discountRate: number | null;
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
  dict,
  lang,
}: HospitalInfoProps) {
  return (
    <div className='flex flex-1 flex-col justify-center gap-1'>
      {/* 지역 정보 */}
      <div className='flex items-center gap-1 text-sm font-medium text-neutral-500'>
        <span>{dict.hospital.region}</span>
        <span>|</span>
        <span>{getLocalizedTextByLocale(address, lang)}</span>
      </div>

      {/* 병원명 */}
      <div className=''>
        <h3 className='text-base font-semibold text-neutral-900'>
          {getLocalizedTextByLocale(name, lang)}
        </h3>
      </div>

      {/* 가격 정보 */}
      <div className='flex gap-1'>
        <span className='text-base font-semibold text-neutral-900'>
          ${prices?.minPrice?.toLocaleString() || 'N/A'}~
        </span>
        {discountRate && (
          <div
            className='flex items-center justify-center rounded-[4px] px-1 py-0.5 text-xs font-semibold text-white'
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgb(255, 87, 41) 0%, rgb(255, 43, 159) 100%)',
            }}
          >
            {discountRate}% OFF
          </div>
        )}
      </div>

      {/* 평점 정보 */}
      {/* <div className='flex items-center gap-1'>
        <span className='text-purple-500'>★</span>
        <span className='text-sm font-medium text-gray-700'>
          {rating.toFixed(1)} ({reviewCount})
        </span>
      </div> */}
    </div>
  );
}

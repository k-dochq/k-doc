import { type LocalizedText, type PriceInfo } from 'shared/model/types/common';

interface HospitalInfoProps {
  name: LocalizedText;
  address: LocalizedText;
  prices: PriceInfo | null;
  rating: number;
  reviewCount: number;
  discountRate: number | null;
}

export function HospitalInfo({
  name,
  address,
  prices,
  rating,
  reviewCount,
  discountRate,
}: HospitalInfoProps) {
  return (
    <div className='flex flex-1 flex-col justify-between'>
      <div className='space-y-2'>
        {/* 지역 정보 */}
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <span>지역</span>
          <span>|</span>
          <span>{address.ko_KR || address.en_US || 'Unknown'}</span>
        </div>

        {/* 병원명 */}
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded-full bg-green-500'></div>
          <h3 className='text-lg font-semibold text-gray-900'>
            {name.ko_KR || name.en_US || 'Unknown Hospital'}
          </h3>
        </div>

        {/* 가격 정보 */}
        <div className='flex items-center gap-2'>
          <span className='text-lg font-bold text-gray-900'>
            ${prices?.minPrice?.toLocaleString() || 'N/A'}~
          </span>
          {discountRate && (
            <div className='rounded bg-pink-500 px-2 py-1 text-xs font-medium text-white'>
              {discountRate}% OFF
            </div>
          )}
        </div>
      </div>

      {/* 평점 정보 */}
      <div className='flex items-center gap-1'>
        <span className='text-purple-500'>★</span>
        <span className='text-sm font-medium text-gray-700'>
          {rating.toFixed(1)} ({reviewCount})
        </span>
      </div>
    </div>
  );
}

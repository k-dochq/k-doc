import { Star, MapPin } from 'lucide-react';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Hospital } from '../api/entities/types';

interface HospitalBasicInfoProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalBasicInfo({ hospital, lang }: HospitalBasicInfoProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원명 없음';
  const hospitalAddress = extractLocalizedText(hospital.address, 'en') || '주소 정보 없음';

  // 평점 표시용 별 배열
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(hospital.rating));

  return (
    <div className='space-y-4'>
      {/* 병원명 */}
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>{hospitalName}</h1>

      {/* 평점 및 리뷰 */}
      <div className='flex items-center gap-2'>
        <div className='flex items-center'>
          {stars.map((filled, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${filled ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className='text-lg font-semibold text-gray-900'>{hospital.rating.toFixed(1)}</span>
        <span className='text-gray-600'>({hospital.reviewCount}개 리뷰)</span>
      </div>

      {/* 주소 */}
      <div className='flex items-start gap-2'>
        <MapPin className='mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500' />
        <p className='text-gray-700'>{hospitalAddress}</p>
      </div>
    </div>
  );
}

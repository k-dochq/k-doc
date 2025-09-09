import Image from 'next/image';
import { Star, MapPin, Clock, Phone, Hospital as HospitalIcon } from 'lucide-react';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Hospital } from '../api/entities/types';
import { type OpeningHours } from '../api/entities/opening-hours-types';

interface HospitalDetailCardProps {
  hospital: Hospital & {
    description?: string;
    openingHours?: OpeningHours;
  };
  lang: Locale;
  dict: Record<string, any>; // 사전 타입도 개선
}

const DAYS_OF_WEEK = {
  ko: ['월', '화', '수', '목', '금', '토', '일'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  th: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
};

export function HospitalDetailCard({ hospital, lang, dict }: HospitalDetailCardProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원명 없음';
  const hospitalAddress = extractLocalizedText(hospital.address, lang) || '주소 정보 없음';

  // 평점 표시용 별 배열
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(hospital.rating));

  // 운영시간 포맷팅
  const formatOperatingHours = () => {
    if (!hospital.openingHours) {
      return '운영시간 정보 없음';
    }

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = DAYS_OF_WEEK[lang] || DAYS_OF_WEEK.ko;

    return days
      .map((day, index) => {
        const dayInfo = hospital.openingHours?.[day as keyof OpeningHours];
        const dayName = dayNames[index];

        if (!dayInfo) {
          return `${dayName}: 정보 없음`;
        }

        if (dayInfo.holiday === true) {
          return `${dayName}: 휴무`;
        }

        if (!dayInfo.openTime || !dayInfo.closeTime) {
          return `${dayName}: 시간 미정`;
        }

        // ISO 시간을 한국 시간으로 변환
        const openTime = new Date(dayInfo.openTime).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        const closeTime = new Date(dayInfo.closeTime).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        return `${dayName}: ${openTime} - ${closeTime}`;
      })
      .join('\n');
  };

  return (
    <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
      {/* 메인 이미지 */}
      <div className='relative h-64 bg-gray-200 md:h-80'>
        {hospital.mainImageUrl ? (
          <Image
            src={hospital.mainImageUrl}
            alt={hospitalName}
            fill
            className='object-cover'
            priority
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
            <div className='text-center'>
              <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                  <HospitalIcon className='h-6 w-6 text-blue-600' />
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-gray-700'>{hospitalName}</p>
                <p className='text-xs text-gray-500'>대표 이미지 준비 중</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 병원 정보 */}
      <div className='p-6'>
        {/* 병원명 */}
        <h1 className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>{hospitalName}</h1>

        {/* 평점 및 리뷰 */}
        <div className='mb-4 flex items-center gap-2'>
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
        <div className='mb-4 flex items-start gap-2'>
          <MapPin className='mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500' />
          <p className='text-gray-700'>{hospitalAddress}</p>
        </div>

        {/* 진료 부위 태그 */}
        {hospital.medicalSpecialties && hospital.medicalSpecialties.length > 0 && (
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold text-gray-900'>진료 부위</h3>
            <div className='flex flex-wrap gap-2'>
              {hospital.medicalSpecialties.map((specialty) => (
                <span
                  key={specialty.id}
                  className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800'
                >
                  {extractLocalizedText(specialty.name, lang)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 병원 소개 */}
        {hospital.description && (
          <div className='mb-6'>
            <h3 className='mb-2 text-lg font-semibold text-gray-900'>병원 소개</h3>
            <p className='leading-relaxed whitespace-pre-line text-gray-700'>
              {hospital.description}
            </p>
          </div>
        )}

        {/* 운영시간 */}
        <div className='mb-6'>
          <h3 className='mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900'>
            <Clock className='h-5 w-5' />
            운영시간
          </h3>
          <div className='rounded-lg bg-gray-50 p-4'>
            <pre className='font-mono text-sm whitespace-pre-line text-gray-700'>
              {formatOperatingHours()}
            </pre>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className='grid grid-cols-3 gap-4 border-t border-gray-200 pt-4'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-blue-600'>{hospital.viewCount}</p>
            <p className='text-sm text-gray-600'>조회수</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-green-600'>{hospital.reviewCount}</p>
            <p className='text-sm text-gray-600'>리뷰</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-purple-600'>{hospital.bookmarkCount}</p>
            <p className='text-sm text-gray-600'>북마크</p>
          </div>
        </div>
      </div>
    </div>
  );
}

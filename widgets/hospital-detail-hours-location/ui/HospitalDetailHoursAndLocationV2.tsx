'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { type GetHospitalDetailResponse } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { ClockIconV2 } from 'shared/ui/icons/ClockIconV2';
import { LocationIconV2 } from 'shared/ui/icons/LocationIconV2';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { getTodayDayOfWeekKST, getTodayDayIndexKST } from 'shared/lib/date-utils-v2';
import { useAddressCopy } from 'widgets/hospital-detail-map/model/useAddressCopy';
import { getGoogleMapsUrl } from 'shared/lib/google-maps-utils';
import { holidayTexts } from 'widgets/hospital-detail-info-section/lib/constants';

interface HospitalDetailHoursAndLocationV2Props {
  hospital: GetHospitalDetailResponse['hospital'];
  lang: Locale;
  dict: Dictionary;
}

/**
 * 시간 문자열을 포맷팅하는 함수
 */
function formatTimeString(timeString: string): string {
  try {
    // 이미 HH:MM 형태인 경우 그대로 반환
    if (/^\d{2}:\d{2}$/.test(timeString)) {
      return timeString;
    }

    // ISO 날짜 문자열인 경우 시간만 추출
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('시간 포맷팅 오류:', error, '입력값:', timeString);
    return timeString;
  }
}

/**
 * 오늘 요일의 운영시간을 가져오는 함수
 */
function getTodayOperatingHours(openingHours: OpeningHours | undefined): {
  hours: string | null;
  isHoliday: boolean;
} {
  if (!openingHours) {
    return { hours: null, isHoliday: false };
  }

  const dayIndex = getTodayDayIndexKST();
  const dayNamesEn = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const dayName = dayNamesEn[dayIndex];
  const daySchedule = openingHours[dayName as keyof OpeningHours];

  if (!daySchedule || daySchedule.holiday || !daySchedule.openTime || !daySchedule.closeTime) {
    return { hours: null, isHoliday: !!daySchedule?.holiday };
  }

  const openTime = formatTimeString(daySchedule.openTime);
  const closeTime = formatTimeString(daySchedule.closeTime);

  return {
    hours: `${openTime} ~ ${closeTime}`,
    isHoliday: false,
  };
}

export function HospitalDetailHoursAndLocationV2({
  hospital,
  lang,
  dict,
}: HospitalDetailHoursAndLocationV2Props) {
  const { copyAddress } = useAddressCopy(dict);
  const todayDayOfWeek = getTodayDayOfWeekKST(lang);
  const todayHours = getTodayOperatingHours(hospital.openingHours);

  // 주소: directions가 있으면 사용, 없으면 address 사용
  const address = extractLocalizedText(hospital.directions || hospital.address, lang) || '';

  const handleCopyAddress = () => {
    if (address) {
      copyAddress(address);
    }
  };

  const handleMapClick = () => {
    if (hospital.latitude && hospital.longitude) {
      const hospitalName = extractLocalizedText(hospital.name, lang) || '';
      const googleMapsUrl = getGoogleMapsUrl(hospital.latitude, hospital.longitude, hospitalName);
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className='bg-white px-5 py-4'
      // style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
      // onTouchStart={(e) => e.stopPropagation()}
      // onTouchMove={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col gap-3'>
        {/* 운영시간 섹션 */}
        {hospital.openingHours && (
          <div className='flex items-start gap-1'>
            <ClockIconV2 width={20} height={20} />
            <div className='flex items-center gap-1'>
              <span className='text-sm leading-5 text-neutral-700'>
                {dict.common?.today || '오늘'} ({todayDayOfWeek})
              </span>
              {todayHours.hours && (
                <>
                  <div className='relative size-[3px] shrink-0'>
                    <svg
                      width='3'
                      height='3'
                      viewBox='0 0 3 3'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='1.5' cy='1.5' r='1.5' fill='#404040' />
                    </svg>
                  </div>
                  <span className='text-sm leading-5 text-neutral-700'>{todayHours.hours}</span>
                  <span className='text-sm leading-5 text-neutral-700'> (KST)</span>
                </>
              )}
              {todayHours.isHoliday && (
                <span className='text-sm leading-5 text-neutral-700'>{holidayTexts[lang]}</span>
              )}
              {!todayHours.hours && !todayHours.isHoliday && (
                <span className='text-sm leading-5 text-neutral-700'>
                  {dict.hospital?.info?.noInformation || '정보 없음'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 위치 섹션 */}
        {address && (
          <div className='flex flex-col gap-2'>
            <div className='flex items-start gap-1'>
              <LocationIconV2 width={20} height={20} />
              <p className='flex-1 text-sm leading-5 whitespace-pre-wrap text-neutral-700'>
                {address}
              </p>
            </div>
            <div className='flex items-start gap-1.5'>
              <button
                onClick={handleCopyAddress}
                className='rounded-full bg-neutral-100 px-3 py-1.5 text-xs leading-4 text-neutral-500'
              >
                {dict.hospital?.address?.copyButton || '주소복사'}
              </button>
              {hospital.latitude && hospital.longitude && (
                <button
                  onClick={handleMapClick}
                  className='rounded-full bg-neutral-100 px-3 py-1.5 text-xs leading-4 text-neutral-500'
                >
                  {dict.hospital?.map?.title || '지도보기'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

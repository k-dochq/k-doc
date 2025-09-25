import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { type DayScheduleData } from './types';
import { dayNamesEn } from './constants';

/**
 * ISO 날짜 문자열에서 시간만 추출하여 포맷팅하는 함수
 */
function formatTimeFromISO(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('시간 포맷팅 오류:', error);
    return isoString;
  }
}

/**
 * 요일별 운영시간 데이터를 생성하는 유틸리티 함수
 */
export function getDaySchedule(
  openingHours: OpeningHours | undefined,
  dayIndex: number,
): DayScheduleData {
  if (!openingHours) {
    return { isOpen: false, hours: null };
  }

  const dayName = dayNamesEn[dayIndex];
  const daySchedule = openingHours[dayName.toLowerCase() as keyof OpeningHours];

  if (!daySchedule || daySchedule.holiday || !daySchedule.openTime || !daySchedule.closeTime) {
    return { isOpen: false, hours: null };
  }

  const openTime = formatTimeFromISO(daySchedule.openTime);
  const closeTime = formatTimeFromISO(daySchedule.closeTime);

  return {
    isOpen: true,
    hours: `${openTime} ~ ${closeTime}`,
  };
}

import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { type DayScheduleData } from './types';
import { dayNamesEn } from './constants';

/**
 * 시간 문자열을 포맷팅하는 함수
 * ISO 날짜 문자열과 HH:MM 형태 문자열을 모두 처리합니다.
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

  const openTime = formatTimeString(daySchedule.openTime);
  const closeTime = formatTimeString(daySchedule.closeTime);

  return {
    isOpen: true,
    hours: `${openTime} ~ ${closeTime}`,
  };
}

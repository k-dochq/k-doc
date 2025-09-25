import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';
import { type DayScheduleData } from './types';
import { dayNamesEn } from './constants';

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

  return {
    isOpen: true,
    hours: `${daySchedule.openTime} ~ ${daySchedule.closeTime}`,
  };
}

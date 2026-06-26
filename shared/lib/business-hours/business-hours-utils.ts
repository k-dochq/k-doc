/**
 * 비즈니스 시간 체크 관련 유틸리티 함수들
 * 한국 시간 기준 평일 09:00~18:00 체크 로직 (공휴일 제외)
 */

import {
  isKoreanPublicHoliday,
  getNextBusinessDayInKorea,
} from './korean-holidays';

/** 운영 개시 시각 (한국 시간 09:00) */
export const OPEN_HOUR = 9;
/** 운영 종료 시각 (한국 시간 18:00) */
export const CLOSE_HOUR = 18;

export interface KoreaTimeComponents {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  dayOfWeek: number;
}

/**
 * 한국 시간 기준으로 현재 시간의 구성 요소를 가져옵니다.
 */
export function getKoreaTimeComponents(): KoreaTimeComponents {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => {
    const part = parts.find((p) => p.type === type);
    return part ? parseInt(part.value, 10) : 0;
  };

  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hours = getPart('hour');
  const minutes = getPart('minute');

  // 한국 시간대의 날짜 문자열을 ISO 형식으로 생성하여 파싱
  const koreaDateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00+09:00`;
  const koreaDate = new Date(koreaDateString);

  // getDay()는 0(일요일)~6(토요일)을 반환하므로, 1(월요일)~7(일요일)로 변환
  const dayOfWeek = koreaDate.getDay() === 0 ? 7 : koreaDate.getDay();

  return {
    year,
    month,
    day,
    hours,
    minutes,
    dayOfWeek, // 1: 월요일, 7: 일요일
  };
}

/**
 * 평일(월~금)인지 확인합니다.
 */
export function isWeekday(dayOfWeek: number): boolean {
  // 1: 월요일, 7: 일요일
  // 1~5가 평일 (월~금)
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}

/**
 * 비즈니스 시간(09:00~18:00) 범위 내인지 확인합니다.
 * 09:00 포함, 18:00 미포함
 */
export function isBusinessHours(hours: number, minutes: number): boolean {
  const totalMinutes = hours * 60 + minutes;

  const startMinutes = 9 * 60; // 09:00
  const endMinutes = 18 * 60; // 18:00

  return totalMinutes >= startMinutes && totalMinutes < endMinutes;
}

/**
 * 한국 시간 기준으로 비즈니스 시간인지 확인합니다.
 * 평일(월~금) 09:00~18:00 범위를 체크하며, 한국 공휴일은 제외합니다.
 */
export function checkBusinessHoursInKorea(): {
  isBusinessHours: boolean;
  currentTime: string;
  koreaTime: KoreaTimeComponents;
  isPublicHoliday: boolean;
  nextBusinessDay?: Date;
} {
  const koreaTime = getKoreaTimeComponents();

  // 오늘 날짜(한국 시간 0시)를 Date로 생성
  const todayKorea = new Date(
    `${koreaTime.year}-${String(koreaTime.month).padStart(2, '0')}-${String(koreaTime.day).padStart(2, '0')}T00:00:00+09:00`,
  );
  const isPublicHoliday = isKoreanPublicHoliday(todayKorea);
  const nextBusinessDay =
    isPublicHoliday ? getNextBusinessDayInKorea(todayKorea) : undefined;

  // 평일인지 확인 (공휴일이면 비즈니스 시간 아님)
  const isWeekdayCheck = isWeekday(koreaTime.dayOfWeek);

  // 비즈니스 시간인지 확인
  const isBusinessHoursCheck = isBusinessHours(koreaTime.hours, koreaTime.minutes);

  // 평일이고 공휴일이 아니고 비즈니스 시간 범위 내인지 확인
  const result =
    !isPublicHoliday && isWeekdayCheck && isBusinessHoursCheck;

  // 현재 시간 포맷팅 (디버깅/로깅용)
  const currentTimeString = `${koreaTime.year}-${String(koreaTime.month).padStart(2, '0')}-${String(koreaTime.day).padStart(2, '0')}T${String(koreaTime.hours).padStart(2, '0')}:${String(koreaTime.minutes).padStart(2, '0')}:00+09:00`;

  return {
    isBusinessHours: result,
    currentTime: currentTimeString,
    koreaTime,
    isPublicHoliday,
    nextBusinessDay,
  };
}

/**
 * 현재(한국 시간) 기준 다음 운영 개시 시각(09:00 KST)을 Date로 반환합니다.
 * - 오늘이 영업일(평일·비공휴일)이고 09:00 이전 → 오늘 09:00
 * - 그 외(영업종료 후 / 주말 / 공휴일) → 다음 영업일 09:00
 * 현재 운영 중이면 null.
 */
export function getNextOpenInKorea(): Date | null {
  const k = getKoreaTimeComponents();

  const todayKorea = new Date(
    `${k.year}-${String(k.month).padStart(2, '0')}-${String(k.day).padStart(2, '0')}T00:00:00+09:00`,
  );
  const todayIsBusinessDay = isWeekday(k.dayOfWeek) && !isKoreanPublicHoliday(todayKorea);

  // 운영 중이면 다음 개시 시각 없음
  if (todayIsBusinessDay && isBusinessHours(k.hours, k.minutes)) {
    return null;
  }

  // 오늘이 영업일이고 아직 개시 전(09:00 이전) → 오늘 09:00
  const beforeOpen = k.hours * 60 + k.minutes < OPEN_HOUR * 60;
  if (todayIsBusinessDay && beforeOpen) {
    return new Date(
      `${k.year}-${String(k.month).padStart(2, '0')}-${String(k.day).padStart(2, '0')}T${String(OPEN_HOUR).padStart(2, '0')}:00:00+09:00`,
    );
  }

  // 그 외 → 다음 영업일 09:00 (getNextBusinessDayInKorea는 해당일 00:00 KST 반환)
  const nextBusinessDay = getNextBusinessDayInKorea(new Date());
  return new Date(nextBusinessDay.getTime() + OPEN_HOUR * 60 * 60 * 1000);
}

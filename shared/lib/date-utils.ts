import dayjs from 'dayjs';
import { type Locale } from 'shared/config';

/**
 * 날짜를 로케일에 맞게 포맷팅하는 유틸리티 함수
 * @param date - 포맷팅할 날짜
 * @param locale - 로케일 (ko, en, th)
 * @param format - dayjs 포맷 문자열 (기본값: 'YYYY년 M월 D일')
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  format: string = 'YYYY년 M월 D일',
): string {
  const dayjsDate = dayjs(date);

  // 로케일별 포맷 설정
  const localeFormats = {
    ko: 'YYYY년 M월 D일',
    en: 'MMMM D, YYYY',
    th: 'D MMMM YYYY',
  };

  const formatString = localeFormats[locale];
  return dayjsDate.format(formatString);
}

/**
 * 날짜를 간단한 형태로 포맷팅 (예: 25.02.03)
 */
export function formatDateSimple(date: Date | string, locale: Locale): string {
  return dayjs(date).format('YY.MM.DD');
}

/**
 * 날짜를 상대적 시간으로 포맷팅 (예: 3일 전, 1주 전)
 */
export function formatRelativeDate(date: Date | string, locale: Locale): string {
  const dayjsDate = dayjs(date);
  const now = dayjs();
  const diffInDays = now.diff(dayjsDate, 'day');

  const messages = {
    ko: {
      today: '오늘',
      yesterday: '어제',
      daysAgo: (days: number) => `${days}일 전`,
      weeksAgo: (weeks: number) => `${weeks}주 전`,
      monthsAgo: (months: number) => `${months}개월 전`,
      yearsAgo: (years: number) => `${years}년 전`,
    },
    en: {
      today: 'Today',
      yesterday: 'Yesterday',
      daysAgo: (days: number) => `${days} days ago`,
      weeksAgo: (weeks: number) => `${weeks} weeks ago`,
      monthsAgo: (months: number) => `${months} months ago`,
      yearsAgo: (years: number) => `${years} years ago`,
    },
    th: {
      today: 'วันนี้',
      yesterday: 'เมื่อวาน',
      daysAgo: (days: number) => `${days} วันที่แล้ว`,
      weeksAgo: (weeks: number) => `${weeks} สัปดาห์ที่แล้ว`,
      monthsAgo: (months: number) => `${months} เดือนที่แล้ว`,
      yearsAgo: (years: number) => `${years} ปีที่แล้ว`,
    },
  };

  const msg = messages[locale];

  if (diffInDays === 0) return msg.today;
  if (diffInDays === 1) return msg.yesterday;
  if (diffInDays < 7) return msg.daysAgo(diffInDays);
  if (diffInDays < 30) return msg.weeksAgo(Math.floor(diffInDays / 7));
  if (diffInDays < 365) return msg.monthsAgo(Math.floor(diffInDays / 30));
  return msg.yearsAgo(Math.floor(diffInDays / 365));
}

/**
 * 날짜가 오늘인지 확인
 */
export function isToday(date: Date | string): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * 날짜가 어제인지 확인
 */
export function isYesterday(date: Date | string): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * 날짜가 이번 주인지 확인
 */
export function isThisWeek(date: Date | string): boolean {
  return dayjs(date).isSame(dayjs(), 'week');
}

/**
 * 날짜가 이번 달인지 확인
 */
export function isThisMonth(date: Date | string): boolean {
  return dayjs(date).isSame(dayjs(), 'month');
}

/**
 * 두 날짜 사이의 차이를 계산
 */
export function getDateDiff(
  date1: Date | string,
  date2: Date | string,
  unit: 'day' | 'week' | 'month' | 'year' = 'day',
): number {
  return dayjs(date1).diff(dayjs(date2), unit);
}

/**
 * 날짜에 일정 기간을 더하거나 빼기
 */
export function addToDate(
  date: Date | string,
  amount: number,
  unit: 'day' | 'week' | 'month' | 'year',
): Date {
  return dayjs(date).add(amount, unit).toDate();
}

/**
 * 날짜를 특정 형식으로 포맷팅 (커스텀 포맷)
 */
export function formatDateCustom(date: Date | string, format: string): string {
  return dayjs(date).format(format);
}

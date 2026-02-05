import { type Locale } from 'shared/config';
import { type OpeningHours } from 'entities/hospital/api/entities/opening-hours-types';

const DAYS_OF_WEEK: Record<Locale, string[]> = {
  ko: ['월', '화', '수', '목', '금', '토', '일'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  th: ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
  'zh-Hant': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ja: ['月', '火', '水', '木', '金', '土', '日'],
  hi: ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'],
  tl: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ar: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};

/**
 * 시간 문자열을 포맷팅하는 유틸리티 함수
 */
export function formatTimeString(timeString: string): string {
  // 먼저 유효한 Date 객체로 변환 가능한지 체크
  const date = new Date(timeString);

  // Date 객체가 유효하고 ISO 형식인 경우 (예: "2023-01-01T10:00:00Z")
  if (!isNaN(date.getTime()) && timeString.includes('T')) {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  // 이미 "HH:MM" 형식이거나 다른 문자열 형식인 경우 그대로 반환
  return timeString;
}

/**
 * 운영시간을 포맷팅하는 함수
 */
export function formatOperatingHours(openingHours: OpeningHours | undefined, lang: Locale): string {
  if (!openingHours) {
    return '운영시간 정보 없음';
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = DAYS_OF_WEEK[lang] || DAYS_OF_WEEK.ko;

  return days
    .map((day, index) => {
      const dayInfo = openingHours[day as keyof OpeningHours];
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

      // 시간 문자열을 유연하게 포맷팅 (날짜 형식이면 변환, 아니면 그대로)
      const openTime = formatTimeString(dayInfo.openTime);
      const closeTime = formatTimeString(dayInfo.closeTime);

      return `${dayName}: ${openTime} - ${closeTime}`;
    })
    .join('\n');
}

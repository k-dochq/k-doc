import { type Locale } from 'shared/config';
import { dayNames } from 'widgets/hospital-detail-info-section/lib/constants';

/**
 * 한국시간(KST) 기준으로 오늘 요일을 다국어 약자로 반환
 * @param lang - 언어 코드
 * @returns 요일 약자 (월/Mon/จ., 화/Tue/อ., 등)
 */
export function getTodayDayOfWeekKST(lang: Locale = 'ko'): string {
  const now = new Date();
  const kstDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const dayOfWeek = kstDate.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  // 월요일을 0으로 하는 인덱스로 변환
  const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return dayNames[lang][dayIndex];
}

/**
 * 한국시간(KST) 기준으로 오늘 요일 인덱스를 반환
 * @returns 요일 인덱스 (0: 월요일, 1: 화요일, ..., 6: 일요일)
 */
export function getTodayDayIndexKST(): number {
  const now = new Date();
  const kstDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

  const dayOfWeek = kstDate.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

  // 월요일을 0으로 하는 인덱스로 변환
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

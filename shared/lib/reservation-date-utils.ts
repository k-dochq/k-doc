import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { type Locale } from 'shared/config';

/**
 * 예약일까지 남은 일수 계산
 * @param reservationDate 예약 날짜
 * @param reservationTime 예약 시간 (HH:MM 형식)
 * @returns 남은 일수 (과거면 null)
 */
export function calculateReservationDaysLeft(
  reservationDate: Date | string,
  reservationTime: string,
): number | null {
  // 예약 날짜와 시간을 결합
  const [hours, minutes] = reservationTime.split(':').map(Number);
  const reservationDateTime = dayjs(reservationDate)
    .hour(hours)
    .minute(minutes)
    .second(0)
    .millisecond(0);

  // 현재 시간 (KST)
  const now = dayjs();

  // 날짜 차이 계산 (일 단위)
  const diffInDays = reservationDateTime.diff(now, 'day');

  // 과거면 null 반환
  if (diffInDays < 0) {
    return null;
  }

  return diffInDays;
}

/**
 * 예약 날짜를 "2025-12-15(월)" 형식으로 포맷팅
 * @param reservationDate 예약 날짜
 * @param lang 언어 코드
 * @returns 포맷팅된 날짜 문자열
 */
export function formatReservationDate(reservationDate: Date | string, lang: Locale = 'ko'): string {
  const date = dayjs(reservationDate);

  // 요일 이름 매핑
  const dayNames: Record<Locale, string[]> = {
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    th: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    'zh-Hant': ['日', '一', '二', '三', '四', '五', '六'],
    ja: ['日', '月', '火', '水', '木', '金', '土'],
  };

  const dayName = dayNames[lang][date.day()];
  const formattedDate = date.format('YYYY-MM-DD');

  return `${formattedDate}(${dayName})`;
}

/**
 * 예약 상태 배지 텍스트 반환
 * @param reservationDate 예약 날짜
 * @param reservationTime 예약 시간
 * @param lang 언어 코드
 * @returns 배지 텍스트 ("D-3" 또는 "시술 완료" 등)
 */
export function getReservationStatusBadge(
  reservationDate: Date | string,
  reservationTime: string,
  lang: Locale = 'ko',
): string {
  const daysLeft = calculateReservationDaysLeft(reservationDate, reservationTime);

  // 과거면 "시술 완료" 표시
  if (daysLeft === null) {
    const statusTexts: Record<Locale, string> = {
      ko: '시술 완료',
      en: 'Completed',
      th: 'เสร็จสิ้น',
      'zh-Hant': 'Completed',
      ja: '完了',
    };
    return statusTexts[lang];
  }

  // D-day 형식으로 반환
  return `D-${daysLeft}`;
}

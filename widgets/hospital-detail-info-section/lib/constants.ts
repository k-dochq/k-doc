import { type Locale } from 'shared/config';

// 요일별 다국어명
export const dayNames: Record<Locale, string[]> = {
  ko: ['월', '화', '수', '목', '금', '토', '일'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  th: ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'],
  'zh-Hant': ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
};

// 요일별 영어명 (데이터베이스 키용)
export const dayNamesEn = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// 휴진 텍스트 다국어
export const holidayTexts: Record<Locale, string> = {
  ko: '휴진',
  en: 'Closed',
  th: 'งดตรวจ',
  'zh-Hant': '休診',
};

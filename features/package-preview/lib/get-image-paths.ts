import { type Locale } from 'shared/config';

export type PackageImageType =
  | 'main'
  | 'price'
  | 'notice'
  | 'what'
  | 'why'
  | 'experience'
  | 'review'
  | 'how'
  | 'support'
  | 'faq'
  | 'table'
  | 'notice2'
  | 'bubble';

const IMAGE_PATHS: Record<PackageImageType, Record<Locale, string>> = {
  main: {
    ko: '/images/event/package/main_ko.png',
    en: '/images/event/package/main_en.png',
    th: '/images/event/package/main_th.png',
    'zh-Hant': '/images/event/package/main_zh.png',
    ja: '/images/event/package/main_jp.png',
  },
  price: {
    ko: '/images/event/package/price_ko.png',
    en: '/images/event/package/price_en.png',
    th: '/images/event/package/price_th.png',
    'zh-Hant': '/images/event/package/price_zh.png',
    ja: '/images/event/package/price_jp.png',
  },
  notice: {
    ko: '/images/event/package/notice_ko.png',
    en: '/images/event/package/notice_en.png',
    th: '/images/event/package/notice_th.png',
    'zh-Hant': '/images/event/package/notice_zh.png',
    ja: '/images/event/package/notice_jp.png',
  },
  what: {
    ko: '/images/event/package/what_ko.png',
    en: '/images/event/package/what_en.png',
    th: '/images/event/package/what_th.png',
    'zh-Hant': '/images/event/package/what_zh.png',
    ja: '/images/event/package/what_jp.png',
  },
  why: {
    ko: '/images/event/package/why_ko.png',
    en: '/images/event/package/why_en.png',
    th: '/images/event/package/why_th.png',
    'zh-Hant': '/images/event/package/why_zh.png',
    ja: '/images/event/package/why_jp.png',
  },
  experience: {
    ko: '/images/event/package/experience_ko.png',
    en: '/images/event/package/experience_en.png',
    th: '/images/event/package/experience_th.png',
    'zh-Hant': '/images/event/package/experience_zh.png',
    ja: '/images/event/package/experience_jp.png',
  },
  review: {
    ko: '/images/event/package/review_ko.png',
    en: '/images/event/package/review_en.png',
    th: '/images/event/package/review_th.png',
    'zh-Hant': '/images/event/package/review_zh.png',
    ja: '/images/event/package/review_jp.png',
  },
  how: {
    ko: '/images/event/package/how_ko.png',
    en: '/images/event/package/how_en.png',
    th: '/images/event/package/how_th.png',
    'zh-Hant': '/images/event/package/how_zh.png',
    ja: '/images/event/package/how_jp.png',
  },
  support: {
    ko: '/images/event/package/support_ko.png',
    en: '/images/event/package/support_en.png',
    th: '/images/event/package/support_th.png',
    'zh-Hant': '/images/event/package/support_zh.png',
    ja: '/images/event/package/support_jp.png',
  },
  faq: {
    ko: '/images/event/package/faq_ko.png',
    en: '/images/event/package/faq_en.png',
    th: '/images/event/package/faq_th.png',
    'zh-Hant': '/images/event/package/faq_zh.png',
    ja: '/images/event/package/faq_jp.png',
  },
  table: {
    ko: '/images/event/package/table_ko.png',
    en: '/images/event/package/table_en.png',
    th: '/images/event/package/table_th.png',
    'zh-Hant': '/images/event/package/table_zh.png',
    ja: '/images/event/package/table_jp.png',
  },
  notice2: {
    ko: '/images/event/package/notice2_ko.png',
    en: '/images/event/package/notice2_en.png',
    th: '/images/event/package/notice2_th.png',
    'zh-Hant': '/images/event/package/notice2_zh.png',
    ja: '/images/event/package/notice2_jp.png',
  },
  bubble: {
    ko: '/images/event/package/bubble_en.svg', // ko용 파일이 없으면 en 사용
    en: '/images/event/package/bubble_en.svg',
    th: '/images/event/package/bubble_th.svg',
    'zh-Hant': '/images/event/package/bubble_en.svg',
    ja: '/images/event/package/bubble_en.svg', // 일본어 이미지가 없으면 영어 이미지 사용
  },
};

export function getPackageImagePath(type: PackageImageType, lang: Locale): string {
  return IMAGE_PATHS[type][lang];
}

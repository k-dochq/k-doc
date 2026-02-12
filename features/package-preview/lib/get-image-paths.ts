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
    hi: '/images/event/package/main_hi.png',
    tl: '/images/event/package/main_tl.png',
    ar: '/images/event/package/main_ar.png',
    ru: '/images/event/package/main_ru.png',
  },
  price: {
    ko: '/images/event/package/price_ko.png',
    en: '/images/event/package/price_en.png',
    th: '/images/event/package/price_th.png',
    'zh-Hant': '/images/event/package/price_zh.png',
    ja: '/images/event/package/price_jp.png',
    hi: '/images/event/package/price_hi.png',
    tl: '/images/event/package/price_tl.png',
    ar: '/images/event/package/price_ar.png',
    ru: '/images/event/package/price_ru.png',
  },
  notice: {
    ko: '/images/event/package/notice_ko.png',
    en: '/images/event/package/notice_en.png',
    th: '/images/event/package/notice_th.png',
    'zh-Hant': '/images/event/package/notice_zh.png',
    ja: '/images/event/package/notice_jp.png',
    hi: '/images/event/package/notice_hi.png',
    tl: '/images/event/package/notice_tl.png',
    ar: '/images/event/package/notice_ar.png',
    ru: '/images/event/package/notice_ru.png',
  },
  what: {
    ko: '/images/event/package/what_ko.png',
    en: '/images/event/package/what_en.png',
    th: '/images/event/package/what_th.png',
    'zh-Hant': '/images/event/package/what_zh.png',
    ja: '/images/event/package/what_jp.png',
    hi: '/images/event/package/what_hi.png',
    tl: '/images/event/package/what_tl.png',
    ar: '/images/event/package/what_ar.png',
    ru: '/images/event/package/what_ru.png',
  },
  why: {
    ko: '/images/event/package/why_ko.png',
    en: '/images/event/package/why_en.png',
    th: '/images/event/package/why_th.png',
    'zh-Hant': '/images/event/package/why_zh.png',
    ja: '/images/event/package/why_jp.png',
    hi: '/images/event/package/why_hi.png',
    tl: '/images/event/package/why_tl.png',
    ar: '/images/event/package/why_ar.png',
    ru: '/images/event/package/why_ru.png',
  },
  experience: {
    ko: '/images/event/package/experience_ko.png',
    en: '/images/event/package/experience_en.png',
    th: '/images/event/package/experience_th.png',
    'zh-Hant': '/images/event/package/experience_zh.png',
    ja: '/images/event/package/experience_jp.png',
    hi: '/images/event/package/experience_hi.png',
    tl: '/images/event/package/experience_tl.png',
    ar: '/images/event/package/experience_ar.png',
    ru: '/images/event/package/experience_ru.png',
  },
  review: {
    ko: '/images/event/package/review_ko.png',
    en: '/images/event/package/review_en.png',
    th: '/images/event/package/review_th.png',
    'zh-Hant': '/images/event/package/review_zh.png',
    ja: '/images/event/package/review_jp.png',
    hi: '/images/event/package/review_hi.png',
    tl: '/images/event/package/review_tl.png',
    ar: '/images/event/package/review_ar.png',
    ru: '/images/event/package/review_ru.png',
  },
  how: {
    ko: '/images/event/package/how_ko.png',
    en: '/images/event/package/how_en.png',
    th: '/images/event/package/how_th.png',
    'zh-Hant': '/images/event/package/how_zh.png',
    ja: '/images/event/package/how_jp.png',
    hi: '/images/event/package/how_hi.png',
    tl: '/images/event/package/how_tl.png',
    ar: '/images/event/package/how_ar.png',
    ru: '/images/event/package/how_ru.png',
  },
  support: {
    ko: '/images/event/package/support_ko.png',
    en: '/images/event/package/support_en.png',
    th: '/images/event/package/support_th.png',
    'zh-Hant': '/images/event/package/support_zh.png',
    ja: '/images/event/package/support_jp.png',
    hi: '/images/event/package/support_hi.png',
    tl: '/images/event/package/support_tl.png',
    ar: '/images/event/package/support_ar.png',
    ru: '/images/event/package/support_ru.png',
  },
  faq: {
    ko: '/images/event/package/faq_ko.png',
    en: '/images/event/package/faq_en.png',
    th: '/images/event/package/faq_th.png',
    'zh-Hant': '/images/event/package/faq_zh.png',
    ja: '/images/event/package/faq_jp.png',
    hi: '/images/event/package/faq_hi.png',
    tl: '/images/event/package/faq_tl.png',
    ar: '/images/event/package/faq_ar.png',
    ru: '/images/event/package/faq_ru.png',
  },
  table: {
    ko: '/images/event/package/table_ko.png',
    en: '/images/event/package/table_en.png',
    th: '/images/event/package/table_th.png',
    'zh-Hant': '/images/event/package/table_zh.png',
    ja: '/images/event/package/table_jp.png',
    hi: '/images/event/package/table_hi.png',
    tl: '/images/event/package/table_tl.png',
    ar: '/images/event/package/table_ar.png',
    ru: '/images/event/package/table_ru.png',
  },
  notice2: {
    ko: '/images/event/package/notice2_ko.png',
    en: '/images/event/package/notice2_en.png',
    th: '/images/event/package/notice2_th.png',
    'zh-Hant': '/images/event/package/notice2_zh.png',
    ja: '/images/event/package/notice2_jp.png',
    hi: '/images/event/package/notice2_hi.png',
    tl: '/images/event/package/notice2_tl.png',
    ar: '/images/event/package/notice2_ar.png',
    ru: '/images/event/package/notice2_ru.png',
  },
  bubble: {
    ko: '/images/event/package/bubble_en.svg', // ko용 파일이 없으면 en 사용
    en: '/images/event/package/bubble_en.svg',
    th: '/images/event/package/bubble_th.svg',
    'zh-Hant': '/images/event/package/bubble_en.svg',
    ja: '/images/event/package/bubble_en.svg', // 일본어 이미지가 없으면 영어 이미지 사용
    hi: '/images/event/package/bubble_en.svg',
    tl: '/images/event/package/bubble_en.svg',
    ar: '/images/event/package/bubble_en.svg',
    ru: '/images/event/package/bubble_en.svg',
  },
};

export function getPackageImagePath(type: PackageImageType, lang: Locale): string {
  return IMAGE_PATHS[type][lang];
}

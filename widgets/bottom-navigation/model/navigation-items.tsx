import { type NavigationItem } from './types';
import {
  HomeIcon,
  HospitalIcon,
  ReviewIcon,
  FavoriteIcon,
  ConsultationIcon,
} from 'shared/ui/icons';

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    href: '/main',
    icon: HomeIcon,
    label: {
      ko: '홈',
      en: 'Home',
      th: 'หน้าแรก',
      'zh-Hant': '首頁',
      ja: 'ホーム',
    },
  },
  {
    id: 'hospitals',
    href: '/hospitals',
    icon: HospitalIcon,
    label: {
      ko: '병원',
      en: 'Hospitals',
      th: 'โรงพยาบาล',
      'zh-Hant': '醫院',
      ja: '病院',
    },
  },
  {
    id: 'reviews',
    href: '/reviews',
    icon: ReviewIcon,
    label: {
      ko: '시술후기',
      en: 'Reviews',
      th: 'รีวิว',
      'zh-Hant': '手術後記',
      ja: '手術レビュー',
    },
  },
  {
    id: 'favorites',
    href: '/favorites',
    icon: FavoriteIcon,
    label: {
      ko: '찜',
      en: 'Favorites',
      th: 'รายการโปรด',
      'zh-Hant': '收藏',
      ja: 'お気に入り',
    },
  },
  {
    id: 'consultation',
    href: '/consultation',
    icon: ConsultationIcon,
    label: {
      ko: '상담',
      en: 'Consultation',
      th: 'ปรึกษา',
      'zh-Hant': '諮詢',
      ja: '相談',
    },
  },
];

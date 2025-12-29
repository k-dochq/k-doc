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
      'zh-TW': 'Home',
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
      'zh-TW': 'Hospitals',
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
      'zh-TW': 'Reviews',
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
      'zh-TW': 'Favorites',
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
      'zh-TW': 'Consultation',
    },
  },
];

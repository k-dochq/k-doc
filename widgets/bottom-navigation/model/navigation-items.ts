import { Home, Building2, FileText, Heart, MessageCircle } from 'lucide-react';
import { type NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    href: '/main',
    icon: Home,
    label: {
      ko: '홈',
      en: 'Home',
      th: 'หน้าแรก',
    },
  },
  {
    id: 'hospitals',
    href: '/hospitals',
    icon: Building2,
    label: {
      ko: '병원',
      en: 'Hospitals',
      th: 'โรงพยาบาล',
    },
  },
  {
    id: 'reviews',
    href: '/reviews',
    icon: FileText,
    label: {
      ko: '시술후기',
      en: 'Reviews',
      th: 'รีวิว',
    },
  },
  {
    id: 'favorites',
    href: '/favorites',
    icon: Heart,
    label: {
      ko: '찜',
      en: 'Favorites',
      th: 'รายการโปรด',
    },
  },
  {
    id: 'consultation',
    href: '/consultation',
    icon: MessageCircle,
    label: {
      ko: '상담',
      en: 'Consultation',
      th: 'ปรึกษา',
    },
  },
];

import { type CategoryItem } from './types';
import {
  EyesIcon,
  NoseIcon,
  LiftingIcon,
  FacialContouringIcon,
  BreastIcon,
  LiposuctionIcon,
  HairTransplantIcon,
  StemCellIcon,
  DermatologyIcon,
  AllIcon,
} from '../ui/icons';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'eyes',
    icon: () => <EyesIcon />,
    labels: { ko: '눈', en: 'Eyes', th: 'ตา' },
  },
  {
    id: 'nose',
    icon: () => <NoseIcon />,
    labels: { ko: '코', en: 'Nose', th: 'จมูก' },
  },
  {
    id: 'lifting',
    icon: () => <LiftingIcon />,
    labels: { ko: '리프팅', en: 'Lifting', th: 'ลิฟติ้ง' },
  },
  {
    id: 'facial-contouring',
    icon: () => <FacialContouringIcon />,
    labels: { ko: '안면윤곽', en: 'Facial Contouring', th: 'โครงหน้า' },
  },
  {
    id: 'breast',
    icon: () => <BreastIcon />,
    labels: { ko: '가슴', en: 'Breast', th: 'หน้าอก' },
  },
  {
    id: 'liposuction',
    icon: () => <LiposuctionIcon />,
    labels: { ko: '지방성형', en: 'Liposuction', th: 'ดูดไขมัน' },
  },
  {
    id: 'hair-transplant',
    icon: () => <HairTransplantIcon />,
    labels: { ko: '모발이식', en: 'Hair Transplant', th: 'ปลูกผม' },
  },
  {
    id: 'stem-cell',
    icon: () => <StemCellIcon />,
    labels: { ko: '줄기세포', en: 'Stem Cell', th: 'สเต็มเซลล์' },
  },
  {
    id: 'dermatology',
    icon: () => <DermatologyIcon />,
    labels: { ko: '피부과', en: 'Dermatology', th: 'ผิวหนัง' },
  },
  {
    id: 'all',
    icon: () => <AllIcon />,
    labels: { ko: '전체', en: 'All', th: 'ทั้งหมด' },
  },
];

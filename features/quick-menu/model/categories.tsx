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
    id: '3df0bd71-16cb-40c6-b372-ddfde9327aad', // EYES
    icon: () => <EyesIcon />,
    labels: { ko_KR: '눈', en_US: 'Eyes', th_TH: 'ดวงตา' },
  },
  {
    id: '6bbbbde1-4806-4db7-a368-0d73f31fc511', // NOSE
    icon: () => <NoseIcon />,
    labels: { ko_KR: '코', en_US: 'Nose', th_TH: 'จมูก' },
  },
  {
    id: 'bc0effa1-af1a-4048-8b57-45130bd74820', // LIFTING
    icon: () => <LiftingIcon />,
    labels: { ko_KR: '리프팅', en_US: 'Lifting', th_TH: 'ยกกระชับ' },
  },
  {
    id: '41144648-d60e-4b8a-8cde-cd5e5af62169', // FACIAL_CONTOURING
    icon: () => <FacialContouringIcon />,
    labels: { ko_KR: '안면윤곽', en_US: 'Facial Contouring', th_TH: 'แก้ไขโครงหน้า' },
  },
  {
    id: '3447ec08-4668-40f9-8b28-52107760e928', // BREAST
    icon: () => <BreastIcon />,
    labels: { ko_KR: '가슴', en_US: 'Breast', th_TH: 'หน้าอก' },
  },
  {
    id: '56739781-11f0-412b-8cd9-ef63024f80c2', // LIPOSUCTION
    icon: () => <LiposuctionIcon />,
    labels: { ko_KR: '지방성형', en_US: 'Liposuction', th_TH: 'ศัลยกรรมดูดไขมัน' },
  },
  {
    id: 'af44669d-002b-45fc-bf4a-b8fe3175e7ae', // HAIR_TRANSPLANT
    icon: () => <HairTransplantIcon />,
    labels: { ko_KR: '모발이식', en_US: 'Hair Transplant', th_TH: 'ปลูกผม' },
  },
  {
    id: '255d42f9-a589-48f7-b8bc-ec046ff16f29', // STEM_CELL
    icon: () => <StemCellIcon />,
    labels: { ko_KR: '줄기세포', en_US: 'Stem Cell', th_TH: 'เซลล์ต้นกำเนิด' },
  },
  {
    id: '24bbf6a7-f34d-4352-af31-90296e8720c0', // DERMATOLOGY
    icon: () => <DermatologyIcon />,
    labels: { ko_KR: '피부과', en_US: 'Dermatology', th_TH: 'โรคผิวหนัง' },
  },
  {
    id: 'all',
    icon: () => <AllIcon />,
    labels: { ko_KR: '전체', en_US: 'All', th_TH: 'ทั้งหมด' },
  },
];

import { type CategoryItem } from './types';
import { type LocalizedText } from 'shared/lib/localized-text';
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
  DentalIcon,
  BodyIcon,
  OtherIcon,
} from '../ui/icons';

// 공통 카테고리 데이터
const COMMON_CATEGORIES: CategoryItem[] = [
  // 순서: 눈, 코, 리프팅, 안면윤곽, 가슴, 줄기세포, 지방흡입, 바디, 모발이식, 피부과, 치과, 기타
  {
    id: '3df0bd71-16cb-40c6-b372-ddfde9327aad', // EYES
    type: 'EYES',
    icon: () => <EyesIcon />,
    iconSmall: () => <EyesIcon variant='small' />,
    labels: {
      ko_KR: '눈',
      en_US: 'Eyes',
      th_TH: 'ดวงตา',
      zh_TW: '眼睛',
      ja_JP: '目',
      hi_IN: 'आंखें',
      tl_PH: 'Eyes',
    } satisfies LocalizedText,
  },
  {
    id: '6bbbbde1-4806-4db7-a368-0d73f31fc511', // NOSE
    type: 'NOSE',
    icon: () => <NoseIcon />,
    iconSmall: () => <NoseIcon variant='small' />,
    labels: {
      ko_KR: '코',
      en_US: 'Nose',
      th_TH: 'จมูก',
      zh_TW: '鼻子',
      ja_JP: '鼻',
      hi_IN: 'नाक',
      tl_PH: 'Nose',
    } satisfies LocalizedText,
  },
  {
    id: 'bc0effa1-af1a-4048-8b57-45130bd74820', // LIFTING
    type: 'LIFTING',
    icon: () => <LiftingIcon />,
    iconSmall: () => <LiftingIcon variant='small' />,
    labels: {
      ko_KR: '리프팅',
      en_US: 'Lifting',
      th_TH: 'ยกกระชับ',
      zh_TW: '拉提',
      ja_JP: 'リフティング',
      hi_IN: 'लिफ्टिंग',
      tl_PH: 'Lifting',
    } satisfies LocalizedText,
  },
  {
    id: '41144648-d60e-4b8a-8cde-cd5e5af62169', // FACIAL_CONTOURING
    type: 'FACIAL_CONTOURING',
    icon: () => <FacialContouringIcon />,
    iconSmall: () => <FacialContouringIcon variant='small' />,
    labels: {
      ko_KR: '안면윤곽',
      en_US: 'Facial Contouring',
      th_TH: 'แก้ไขโครงหน้า',
      zh_TW: '臉部輪廓',
      ja_JP: '顔面輪郭',
      hi_IN: 'चेहरे का आकार',
      tl_PH: 'Facial Contouring',
    } satisfies LocalizedText,
  },
  {
    id: '3447ec08-4668-40f9-8b28-52107760e928', // BREAST
    type: 'BREAST',
    icon: () => <BreastIcon />,
    iconSmall: () => <BreastIcon variant='small' />,
    labels: {
      ko_KR: '가슴',
      en_US: 'Breast',
      th_TH: 'หน้าอก',
      zh_TW: '胸部',
      ja_JP: '胸',
      hi_IN: 'स्तन',
      tl_PH: 'Breast',
    } satisfies LocalizedText,
  },
  {
    id: '255d42f9-a589-48f7-b8bc-ec046ff16f29', // STEM_CELL
    type: 'STEM_CELL',
    icon: () => <StemCellIcon />,
    iconSmall: () => <StemCellIcon variant='small' />,
    labels: {
      ko_KR: '줄기세포',
      en_US: 'Stem Cell',
      th_TH: 'เซลล์ต้นกำเนิด',
      zh_TW: '幹細胞',
      ja_JP: '幹細胞',
      hi_IN: 'स्टेम सेल',
      tl_PH: 'Stem Cell',
    } satisfies LocalizedText,
  },
  {
    id: '56739781-11f0-412b-8cd9-ef63024f80c2', // LIPOSUCTION
    type: 'LIPOSUCTION',
    icon: () => <LiposuctionIcon />,
    iconSmall: () => <LiposuctionIcon variant='small' />,
    labels: {
      ko_KR: '지방흡입',
      en_US: 'Liposuction',
      th_TH: 'ศัลยกรรมดูดไขมัน',
      zh_TW: '抽脂',
      ja_JP: '脂肪吸引',
      hi_IN: 'लिपोसक्शन',
      tl_PH: 'Liposuction',
    } satisfies LocalizedText,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // BODY
    type: 'BODY',
    icon: () => <BodyIcon />,
    iconSmall: () => <BodyIcon variant='small' />,
    labels: {
      ko_KR: '바디',
      en_US: 'Body',
      th_TH: 'ศัลยกรรมร่างกาย',
      zh_TW: '身體',
      ja_JP: 'ボディ',
      hi_IN: 'शरीर',
      tl_PH: 'Body',
    } satisfies LocalizedText,
  },
  {
    id: 'af44669d-002b-45fc-bf4a-b8fe3175e7ae', // HAIR_TRANSPLANT
    type: 'HAIR_TRANSPLANT',
    icon: () => <HairTransplantIcon />,
    iconSmall: () => <HairTransplantIcon variant='small' />,
    labels: {
      ko_KR: '모발이식',
      en_US: 'Hair Transplant',
      th_TH: 'ปลูกผม',
      zh_TW: '植髮',
      ja_JP: '植毛',
      hi_IN: 'बाल प्रत्यारोपण',
      tl_PH: 'Hair Transplant',
    } satisfies LocalizedText,
  },
  {
    id: '24bbf6a7-f34d-4352-af31-90296e8720c0', // DERMATOLOGY
    type: 'DERMATOLOGY',
    icon: () => <DermatologyIcon />,
    iconSmall: () => <DermatologyIcon variant='small' />,
    labels: {
      ko_KR: '피부과',
      en_US: 'Dermatology',
      th_TH: 'โรคผิวหนัง',
      zh_TW: '皮膚科',
      ja_JP: '皮膚科',
      hi_IN: 'त्वचाविज्ञान',
      tl_PH: 'Dermatology',
    } satisfies LocalizedText,
  },
  {
    id: '9cbe9f04-8a8c-4533-b7f3-86f707066bd7', // DENTAL
    type: 'DENTAL',
    icon: () => <DentalIcon />,
    iconSmall: () => <DentalIcon variant='small' />,
    labels: {
      ko_KR: '치과',
      en_US: 'Dental',
      th_TH: 'ทันตกรรม',
      zh_TW: '牙科',
      ja_JP: '歯科',
      hi_IN: 'दंत चिकित्सा',
      tl_PH: 'Dental',
    } satisfies LocalizedText,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012', // ETC
    type: 'ETC',
    icon: () => <OtherIcon />,
    iconSmall: () => <OtherIcon variant='small' />,
    labels: {
      ko_KR: '기타',
      en_US: 'Others',
      th_TH: 'อื่นๆ',
      zh_TW: '其他',
      ja_JP: 'その他',
      hi_IN: 'अन्य',
      tl_PH: 'Others',
    } satisfies LocalizedText,
  },
];

// 전체 카테고리
const ALL_CATEGORY: CategoryItem = {
  id: 'all',
  type: 'all',
  icon: () => <AllIcon />,
  iconSmall: () => <AllIcon variant='small' />,
  labels: {
    ko_KR: '전체',
    en_US: 'All',
    th_TH: 'ทั้งหมด',
    zh_TW: '全部',
    ja_JP: 'すべて',
    hi_IN: 'सभी',
    tl_PH: 'All',
  } satisfies LocalizedText,
};

// Quick Menu용 카테고리 (전체 제외)
export const QUICK_MENU_CATEGORIES: CategoryItem[] = COMMON_CATEGORIES;

// 일반용 카테고리 (전체 포함)
export const CATEGORIES: CategoryItem[] = [...COMMON_CATEGORIES, ALL_CATEGORY];

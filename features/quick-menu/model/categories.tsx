import { type CategoryItem } from './types';
import { type LocalizedText } from 'shared/lib/localized-text';
import {
  EyesIcon,
  NoseIcon,
  LiftingIcon,
  FacialContouringIcon,
  BreastIcon,
  StemCellIcon,
  LiposuctionIcon,
  BodyIcon,
  HairTransplantIcon,
  DermatologyIcon,
  DentalIcon,
  OtherIcon,
  AllIcon,
  EyesIconV2,
  NoseIconV2,
  LiftingIconV2,
  FacialContouringIconV2,
  BreastIconV2,
  StemCellIconV2,
  LiposuctionIconV2,
  BodyIconV2,
  HairTransplantIconV2,
  DermatologyIconV2,
  DentalIconV2,
  OtherIconV2,
} from '../ui/icons';

interface CategoryDef {
  id: string;
  type: string;
  labels: LocalizedText;
}

// 단일 데이터 소스 — Supabase public."MedicalSpecialty" 테이블 기준
// 수정 시: 1) DB 업데이트, 2) admin 시트(gid=49150223)도 함께 동기화
const CATEGORY_DEFS: CategoryDef[] = [
  {
    id: '3df0bd71-16cb-40c6-b372-ddfde9327aad',
    type: 'EYES',
    labels: {
      ko_KR: '눈',
      en_US: 'Eyes',
      th_TH: 'ดวงตา',
      zh_TW: '眼睛',
      ja_JP: '目',
      hi_IN: 'आंखें',
      tl_PH: 'Eyes',
      ar_SA: 'عيون',
      ru_RU: 'глаз',
    } satisfies LocalizedText,
  },
  {
    id: '6bbbbde1-4806-4db7-a368-0d73f31fc511',
    type: 'NOSE',
    labels: {
      ko_KR: '코',
      en_US: 'Nose',
      th_TH: 'จมูก',
      zh_TW: '鼻子',
      ja_JP: '鼻',
      hi_IN: 'नाक',
      tl_PH: 'Nose',
      ar_SA: 'أنف',
      ru_RU: 'нос',
    } satisfies LocalizedText,
  },
  {
    id: 'bc0effa1-af1a-4048-8b57-45130bd74820',
    type: 'LIFTING',
    labels: {
      ko_KR: '리프팅',
      en_US: 'Lifting',
      th_TH: 'ยกกระชับ',
      zh_TW: '拉提',
      ja_JP: 'リフティング',
      hi_IN: 'लिफ्टिंग',
      tl_PH: 'Lifting',
      ar_SA: 'رفع',
      ru_RU: 'Подъем',
    } satisfies LocalizedText,
  },
  {
    id: '41144648-d60e-4b8a-8cde-cd5e5af62169',
    type: 'FACIAL_CONTOURING',
    labels: {
      ko_KR: '안면윤곽',
      en_US: 'Facial Contouring',
      th_TH: 'แก้ไข\nโครงหน้า',
      zh_TW: '臉部輪廓',
      ja_JP: '顔面輪郭',
      hi_IN: 'चेहरे की आकृति',
      tl_PH: 'Facial Contouring',
      ar_SA: 'تشكيل الوجه',
      ru_RU: 'Контур\nлица',
    } satisfies LocalizedText,
  },
  {
    id: '3447ec08-4668-40f9-8b28-52107760e928',
    type: 'BREAST',
    labels: {
      ko_KR: '가슴',
      en_US: 'Breast',
      th_TH: 'หน้าอก',
      zh_TW: '胸部',
      ja_JP: '胸',
      hi_IN: 'स्तन',
      tl_PH: 'Breast',
      ar_SA: 'الثدي',
      ru_RU: 'грудь',
    } satisfies LocalizedText,
  },
  {
    id: '255d42f9-a589-48f7-b8bc-ec046ff16f29',
    type: 'STEM_CELL',
    labels: {
      ko_KR: '줄기세포',
      en_US: 'Stem Cell',
      th_TH: 'สเต็มเซลล์',
      zh_TW: '幹細胞',
      ja_JP: '幹細胞',
      hi_IN: 'स्टेम सेल',
      tl_PH: 'Stem Cell',
      ar_SA: 'الخلايا الجذعية',
      ru_RU: 'стволовые\nклетки',
    } satisfies LocalizedText,
  },
  {
    id: '56739781-11f0-412b-8cd9-ef63024f80c2',
    type: 'LIPOSUCTION',
    labels: {
      ko_KR: '지방흡입',
      en_US: 'Liposuction',
      th_TH: 'ดูดไขมัน',
      zh_TW: '抽脂',
      ja_JP: '脂肪吸引',
      hi_IN: 'लिपोसक्शन',
      tl_PH: 'Liposuction',
      ar_SA: 'شفط الدهون',
      ru_RU: 'Липосакция',
    } satisfies LocalizedText,
  },
  {
    id: '649d8f89-479a-4d53-beb9-47c5ebc59b3a',
    type: 'BODY',
    labels: {
      ko_KR: '바디',
      en_US: 'Body',
      th_TH: 'รูปร่าง',
      zh_TW: '身體',
      ja_JP: 'ボディ',
      hi_IN: 'बॉडी',
      tl_PH: 'Body',
      ar_SA: 'الجسم',
      ru_RU: 'тело',
    } satisfies LocalizedText,
  },
  {
    id: 'af44669d-002b-45fc-bf4a-b8fe3175e7ae',
    type: 'HAIR_TRANSPLANT',
    labels: {
      ko_KR: '모발이식',
      en_US: 'Hair Transplant',
      th_TH: 'ปลูกผม',
      zh_TW: '植髮',
      ja_JP: '植毛',
      hi_IN: 'बाल प्रत्यारोपण',
      tl_PH: 'Hair Transplant',
      ar_SA: 'زراعة الشعر',
      ru_RU: 'пересадка\nволос',
    } satisfies LocalizedText,
  },
  {
    id: '24bbf6a7-f34d-4352-af31-90296e8720c0',
    type: 'DERMATOLOGY',
    labels: {
      ko_KR: '피부과',
      en_US: 'Dermatology',
      th_TH: 'โรคผิวหนัง',
      zh_TW: '皮膚科',
      ja_JP: '皮膚科',
      hi_IN: 'त्वचा विज्ञान',
      tl_PH: 'Dermatology',
      ar_SA: 'الجلدية',
      ru_RU: 'Дермато',
    } satisfies LocalizedText,
  },
  {
    id: '9cbe9f04-8a8c-4533-b7f3-86f707066bd7',
    type: 'DENTAL',
    labels: {
      ko_KR: '치과',
      en_US: 'Dental',
      th_TH: 'ทันตกรรม',
      zh_TW: '牙科',
      ja_JP: '歯科',
      hi_IN: 'दंत चिकित्सा',
      tl_PH: 'Dental',
      ar_SA: 'الأسنان',
      ru_RU: 'Стомат',
    } satisfies LocalizedText,
  },
  {
    id: '52095c86-fbc2-4132-bc27-7d4b451d52d4',
    type: 'ETC',
    labels: {
      ko_KR: '기타',
      en_US: 'Others',
      th_TH: 'อื่นๆ',
      zh_TW: '其他',
      ja_JP: 'その他',
      hi_IN: 'अन्य',
      tl_PH: 'Others',
      ar_SA: 'أخرى',
      ru_RU: 'и т. д.',
    } satisfies LocalizedText,
  },
];

function renderV1Icon(type: string, small = false): React.ReactNode {
  const v = small ? ('small' as const) : undefined;
  switch (type) {
    case 'EYES':
      return <EyesIcon variant={v} />;
    case 'NOSE':
      return <NoseIcon variant={v} />;
    case 'LIFTING':
      return <LiftingIcon variant={v} />;
    case 'FACIAL_CONTOURING':
      return <FacialContouringIcon variant={v} />;
    case 'BREAST':
      return <BreastIcon variant={v} />;
    case 'STEM_CELL':
      return <StemCellIcon variant={v} />;
    case 'LIPOSUCTION':
      return <LiposuctionIcon variant={v} />;
    case 'BODY':
      return <BodyIcon variant={v} />;
    case 'HAIR_TRANSPLANT':
      return <HairTransplantIcon variant={v} />;
    case 'DERMATOLOGY':
      return <DermatologyIcon variant={v} />;
    case 'DENTAL':
      return <DentalIcon variant={v} />;
    case 'ETC':
      return <OtherIcon variant={v} />;
    default:
      return null;
  }
}

function renderV2Icon(type: string): React.ReactNode {
  switch (type) {
    case 'EYES':
      return <EyesIconV2 />;
    case 'NOSE':
      return <NoseIconV2 />;
    case 'LIFTING':
      return <LiftingIconV2 />;
    case 'FACIAL_CONTOURING':
      return <FacialContouringIconV2 />;
    case 'BREAST':
      return <BreastIconV2 />;
    case 'STEM_CELL':
      return <StemCellIconV2 />;
    case 'LIPOSUCTION':
      return <LiposuctionIconV2 />;
    case 'BODY':
      return <BodyIconV2 />;
    case 'HAIR_TRANSPLANT':
      return <HairTransplantIconV2 />;
    case 'DERMATOLOGY':
      return <DermatologyIconV2 />;
    case 'DENTAL':
      return <DentalIconV2 />;
    case 'ETC':
      return <OtherIconV2 />;
    default:
      return null;
  }
}

const QUICK_MENU_BASE_V1: CategoryItem[] = CATEGORY_DEFS.map((def) => ({
  ...def,
  icon: () => renderV1Icon(def.type),
  iconSmall: () => renderV1Icon(def.type, true),
}));

const QUICK_MENU_BASE_V2: CategoryItem[] = CATEGORY_DEFS.map((def) => ({
  ...def,
  icon: () => renderV2Icon(def.type),
  iconSmall: () => null,
}));

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
    ar_SA: 'الكل',
    ru_RU: 'Все',
  } satisfies LocalizedText,
};

// Quick Menu V1용 카테고리 (전체 제외)
export const QUICK_MENU_CATEGORIES: CategoryItem[] = QUICK_MENU_BASE_V1;

// V1 일반용 카테고리 (전체 포함)
export const CATEGORIES: CategoryItem[] = [...QUICK_MENU_BASE_V1, ALL_CATEGORY];

// Quick Menu V2용 카테고리 (전체 제외)
export const QUICK_MENU_CATEGORIES_V2: CategoryItem[] = QUICK_MENU_BASE_V2;

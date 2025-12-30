import { type LocalizedText } from 'shared/lib/localized-text';

// 절개 카테고리를 추가할 병원 ID 목록
export const INCISIONAL_HOSPITAL_IDS = [
  '78978a8f-57ca-41c2-9208-141b2bcc9ecb', // 닥터송포유
  'accdacfc-8e9c-4cd6-85ad-d46198097ba6', // 제로원
] as const;

// 비절개 카테고리를 추가할 병원 ID 목록
export const NON_INCISIONAL_HOSPITAL_IDS = [
  'ffda0620-c254-44db-8b13-ef4ef5d368e5', // 압구정미라클
  '035d29cf-be68-48f4-b746-c09f72fbb8ee', // 피그마리온
  '20198317-7047-4dbd-b58b-78c8ef1a7373', // 연세다인
  'eca3cbc9-a2bb-4459-8966-a7091dd0678d', // V&MJ
  'd21d963b-6e9f-456d-86b6-6e769cca22bc', // 리팅
] as const;

// 절개 카테고리 데이터
export const INCISIONAL_CATEGORY = {
  id: 'incisional-category',
  name: {
    ko_KR: '절개',
    en_US: 'Incisional',
    th_TH: 'การผ่าตัดแบบเปิดแผล',
    zh_TW: '切開',
  } satisfies LocalizedText,
} as const;

// 비절개 카테고리 데이터
export const NON_INCISIONAL_CATEGORY = {
  id: 'non-incisional-category',
  name: {
    ko_KR: '비절개',
    en_US: 'Non-Incisional',
    th_TH: 'แบบไม่เปิดแผล',
    zh_TW: '非切開',
  } satisfies LocalizedText,
} as const;

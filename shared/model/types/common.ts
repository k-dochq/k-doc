import { Locale } from '@/shared/config';
import { type Prisma } from '@prisma/client';

// 다국어 텍스트 타입
export interface LocalizedText {
  ko_KR?: string;
  en_US?: string;
  th_TH?: string;
  zh_TW?: string;
}

// 가격 정보 타입
export interface PriceInfo {
  minPrice?: number;
  maxPrice?: number;
}

// District 타입을 Prisma에서 가져와서 사용 (JsonValue 타입 그대로 유지)
export type DistrictInfo = Prisma.DistrictGetPayload<{
  select: {
    id: true;
    name: true;
    displayName: true;
    countryCode: true;
    level: true;
    order: true;
    parentId: true;
  };
}>;

// Hospital Card Data 타입 정의 (병원 카드 컴포넌트에서 사용)
export interface HospitalCardData {
  id: string;
  name: LocalizedText;
  address: LocalizedText;
  prices: PriceInfo | null;
  rating: number;
  reviewCount: number; // 실제 리뷰 수
  thumbnailImageUrl: string | null;
  discountRate: number | null;
  medicalSpecialties?: MedicalSpecialty[]; // 시술부위 태그
  district?: DistrictInfo | null; // 지역 정보
  displayLocationName?: LocalizedText | null; // 표시 지역명
  // 좋아요 관련 필드 (선택적)
  likeCount?: number;
  isLiked?: boolean;
  likedUserIds?: string[];
  // Hospital 타입과의 호환성을 위한 추가 필드들
  bookmarkCount?: number;
  viewCount?: number;
  approvalStatusType?: 'PENDING' | 'APPROVED' | 'REJECTED';
  ranking?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  mainImageUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  badge?: string[] | null; // 뱃지 배열
}

export interface MedicalSpecialty {
  id: string;
  name: LocalizedText;
  specialtyType: string;
}

// Prisma JsonValue를 LocalizedText로 변환하는 헬퍼 함수
export function parseLocalizedText(jsonValue: Prisma.JsonValue): LocalizedText {
  if (typeof jsonValue === 'object' && jsonValue !== null) {
    return jsonValue as LocalizedText;
  }
  return {};
}

// Prisma JsonValue를 PriceInfo로 변환하는 헬퍼 함수
export function parsePriceInfo(jsonValue: Prisma.JsonValue | null): PriceInfo | null {
  if (jsonValue === null) return null;
  if (typeof jsonValue === 'object' && jsonValue !== null) {
    return jsonValue as PriceInfo;
  }
  return null;
}

// LocalizedText에서 특정 언어의 텍스트를 추출하는 함수
export function getLocalizedText(
  text: LocalizedText,
  locale: 'ko_KR' | 'en_US' | 'th_TH' | 'zh_TW',
): string {
  return text[locale] || text.ko_KR || text.en_US || text.th_TH || text.zh_TW || '';
}

// Locale을 LocalizedText 언어 코드로 변환하는 함수
export function getLocalizedTextByLocale(text: LocalizedText, locale: Locale): string {
  const localeKey =
    locale === 'ko' ? 'ko_KR' : locale === 'en' ? 'en_US' : locale === 'th' ? 'th_TH' : 'zh_TW';
  return text[localeKey] || text.ko_KR || text.en_US || text.th_TH || text.zh_TW || '';
}

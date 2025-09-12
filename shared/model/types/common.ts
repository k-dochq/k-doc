import { type Prisma } from '@prisma/client';

// 다국어 텍스트 타입
export interface LocalizedText {
  ko_KR?: string;
  en_US?: string;
  th_TH?: string;
}

// 가격 정보 타입
export interface PriceInfo {
  minPrice?: number;
  maxPrice?: number;
}

// Best Hospital 타입 정의 (필요한 필드만)
export interface BestHospital {
  id: string;
  name: LocalizedText;
  address: LocalizedText;
  prices: PriceInfo | null;
  rating: number;
  reviewCount: number; // 실제 리뷰 수
  thumbnailImageUrl: string | null;
  discountRate: number | null;
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
export function getLocalizedText(text: LocalizedText, locale: 'ko_KR' | 'en_US' | 'th_TH'): string {
  return text[locale] || text.ko_KR || text.en_US || text.th_TH || '';
}

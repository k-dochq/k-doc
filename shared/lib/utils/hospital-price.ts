import { type PriceInfo } from 'shared/model/types';
import { type Dictionary } from 'shared/model/types';

/**
 * 병원 가격을 포맷팅하는 유틸리티 함수
 * 최소가격이 있으면 "$1,000~" 형식으로 반환하고,
 * 없으면 "상담 후 협의" 텍스트를 반환합니다.
 */
export function formatHospitalPrice(
  prices: PriceInfo | null | undefined,
  dict: Dictionary,
): string {
  if (prices?.minPrice) {
    return `$${prices.minPrice.toLocaleString()}~`;
  }
  return dict.hospital?.priceConsultation || '상담 후 협의';
}

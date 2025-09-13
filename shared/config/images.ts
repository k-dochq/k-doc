/**
 * 기본 이미지 URL 상수
 */
export const DEFAULT_IMAGES = {
  AVATAR_PLACEHOLDER: '/images/avatar-placeholder.svg',
  PRODUCT_PLACEHOLDER: '/images/product-placeholder.svg',
  HOSPITAL_DEFAULT: '/images/shared/default_image.png',
} as const;

/**
 * 병원 이미지 URL 반환 (null이면 기본 아이콘 사용)
 */
export function getHospitalImageUrl(imageUrl?: string | null): string | null {
  return imageUrl || null;
}

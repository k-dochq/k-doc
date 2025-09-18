import { type HospitalImage, type HospitalImageType } from '@prisma/client';

/**
 * 병원 이미지 기본 인터페이스 (필수 필드만)
 */
interface HospitalImageBasic {
  imageType: HospitalImageType;
  imageUrl: string;
}

/**
 * 병원 이미지 타입 우선순위
 * MAIN → THUMBNAIL → 첫 번째 이미지 순서로 우선순위 결정
 */
export function getHospitalMainImageUrl(hospitalImages: HospitalImageBasic[]): string | null {
  if (!hospitalImages || hospitalImages.length === 0) {
    return null;
  }

  // 1. MAIN 타입 이미지 우선
  const mainImage = hospitalImages.find((img) => img.imageType === 'MAIN');
  if (mainImage) {
    return mainImage.imageUrl;
  }

  // 2. THUMBNAIL 타입 이미지
  const thumbnailImage = hospitalImages.find((img) => img.imageType === 'THUMBNAIL');
  if (thumbnailImage) {
    return thumbnailImage.imageUrl;
  }

  // 3. 첫 번째 이미지 (기타 타입 중)
  return hospitalImages[0]?.imageUrl || null;
}

/**
 * 병원 썸네일 이미지 URL 반환 (리스트용)
 * THUMBNAIL → MAIN → 첫 번째 이미지 순서로 우선순위 결정
 */
export function getHospitalThumbnailImageUrl(hospitalImages: HospitalImageBasic[]): string | null {
  if (!hospitalImages || hospitalImages.length === 0) {
    return null;
  }

  // 1. THUMBNAIL 타입 이미지 우선
  const thumbnailImage = hospitalImages.find((img) => img.imageType === 'THUMBNAIL');
  if (thumbnailImage) {
    return thumbnailImage.imageUrl;
  }

  // 2. MAIN 타입 이미지
  const mainImage = hospitalImages.find((img) => img.imageType === 'MAIN');
  if (mainImage) {
    return mainImage.imageUrl;
  }

  // 3. 첫 번째 이미지 (기타 타입 중)
  return hospitalImages[0]?.imageUrl || null;
}

/**
 * 병원 이미지 타입별 우선순위 상수
 */
export const HOSPITAL_IMAGE_PRIORITY = {
  MAIN: ['MAIN', 'THUMBNAIL', 'DETAIL', 'INTERIOR', 'PROMOTION'],
  THUMBNAIL: ['THUMBNAIL', 'MAIN', 'DETAIL', 'INTERIOR', 'PROMOTION'],
} as const;

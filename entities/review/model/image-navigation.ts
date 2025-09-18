import { type ReviewImage } from './types';
import { ReviewImageType } from '@prisma/client';

export type ImageType = ReviewImageType;

export interface ImageNavigationData {
  currentIndex: number; // 전체 이미지 중 현재 이미지의 인덱스 (1부터 시작)
  totalCount: number; // 전체 이미지 개수
  imageType: ImageType; // 현재 이미지 타입
  typeIndex: number; // 해당 타입 내에서의 인덱스 (1부터 시작)
  typeCount: number; // 해당 타입의 총 개수
}

export interface ReviewImagesData {
  beforeImages: ReviewImage[];
  afterImages: ReviewImage[];
  allImages: Array<ReviewImage & { type: ImageType }>;
}

/**
 * 리뷰 이미지 데이터를 처리하여 네비게이션에 필요한 정보를 생성합니다.
 */
export function processReviewImages(
  beforeImages: ReviewImage[],
  afterImages: ReviewImage[],
): ReviewImagesData {
  // Before 이미지에 타입 정보 추가
  const beforeImagesWithType = beforeImages.map((image) => ({
    ...image,
    type: ReviewImageType.BEFORE,
  }));

  // After 이미지에 타입 정보 추가
  const afterImagesWithType = afterImages.map((image) => ({
    ...image,
    type: ReviewImageType.AFTER,
  }));

  // 전체 이미지 배열 생성 (Before 이미지가 먼저, After 이미지가 나중)
  const allImages = [...beforeImagesWithType, ...afterImagesWithType];

  return {
    beforeImages,
    afterImages,
    allImages,
  };
}

/**
 * 특정 이미지의 네비게이션 정보를 계산합니다.
 */
export function calculateImageNavigation(
  imagesData: ReviewImagesData,
  targetImageId: string,
): ImageNavigationData | null {
  const { beforeImages, afterImages, allImages } = imagesData;

  // 전체 이미지에서 타겟 이미지의 인덱스 찾기
  const globalIndex = allImages.findIndex((image) => image.id === targetImageId);

  if (globalIndex === -1) {
    return null; // 이미지를 찾을 수 없음
  }

  const targetImage = allImages[globalIndex];
  const imageType = targetImage.type;

  // 해당 타입 내에서의 인덱스 계산
  let typeIndex: number;
  let typeCount: number;

  if (imageType === ReviewImageType.BEFORE) {
    typeIndex = beforeImages.findIndex((image) => image.id === targetImageId) + 1;
    typeCount = beforeImages.length;
  } else {
    typeIndex = afterImages.findIndex((image) => image.id === targetImageId) + 1;
    typeCount = afterImages.length;
  }

  return {
    currentIndex: globalIndex + 1, // 1부터 시작
    totalCount: allImages.length,
    imageType,
    typeIndex,
    typeCount,
  };
}

/**
 * URL 파라미터로부터 이미지 타입과 인덱스를 파싱합니다.
 */
export function parseImageParams(searchParams: URLSearchParams): {
  imageType: ImageType | null;
  imageIndex: number | null;
} {
  const type = searchParams.get('type');
  const index = searchParams.get('index');

  let imageType: ImageType | null = null;
  if (type === 'BEFORE' || type === 'before') {
    imageType = ReviewImageType.BEFORE;
  } else if (type === 'AFTER' || type === 'after') {
    imageType = ReviewImageType.AFTER;
  }

  const imageIndex = index ? parseInt(index, 10) : null;

  return {
    imageType,
    imageIndex: imageIndex && imageIndex > 0 ? imageIndex : null,
  };
}

/**
 * 이미지 타입과 인덱스로부터 해당하는 이미지 ID를 찾습니다.
 */
export function findImageByTypeAndIndex(
  imagesData: ReviewImagesData,
  imageType: ImageType,
  typeIndex: number,
): string | null {
  const targetImages =
    imageType === ReviewImageType.BEFORE ? imagesData.beforeImages : imagesData.afterImages;

  if (typeIndex < 1 || typeIndex > targetImages.length) {
    return null;
  }

  return targetImages[typeIndex - 1]?.id || null;
}

/**
 * 헤더에 표시할 텍스트를 생성합니다.
 */
export function generateHeaderText(
  navigationData: ImageNavigationData,
  lang: 'ko' | 'en' | 'th' = 'ko',
): string {
  const { imageType, currentIndex, totalCount } = navigationData;

  const texts = {
    ko: {
      [ReviewImageType.BEFORE]: '시술 전 사진',
      [ReviewImageType.AFTER]: '시술 후 사진',
    },
    en: {
      [ReviewImageType.BEFORE]: 'Before Photo',
      [ReviewImageType.AFTER]: 'After Photo',
    },
    th: {
      [ReviewImageType.BEFORE]: 'ภาพก่อนทำ',
      [ReviewImageType.AFTER]: 'ภาพหลังทำ',
    },
  };

  const typeText = texts[lang][imageType];
  return `${typeText} ${currentIndex} / ${totalCount}`;
}

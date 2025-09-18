import { type Dictionary } from 'shared/model/types';
import { type ReviewImagesData } from 'entities/review/model/image-navigation';

/**
 * 리뷰 이미지 헤더 텍스트를 생성하는 함수
 * @param imagesData - 이미지 데이터
 * @param index - 현재 이미지 인덱스 (0-based)
 * @param dict - 다국어 사전
 * @returns 헤더 텍스트 또는 null
 */
export function generateReviewImagesHeaderText(
  imagesData: ReviewImagesData,
  index: number,
  dict: Dictionary,
): string | null {
  if (!imagesData || isNaN(index)) {
    return null;
  }

  const beforeCount = imagesData.beforeImages.length;
  const afterCount = imagesData.afterImages.length;
  const totalCount = beforeCount + afterCount;

  // index가 before 범위에 있는지 확인
  if (index < beforeCount) {
    // Before 이미지 영역
    const beforeIndex = index + 1; // 1-based index
    return `${dict.reviewImages.beforePhoto} ${beforeIndex} / ${totalCount}`;
  } else {
    // After 이미지 영역
    const overallIndex = index + 1; // 전체에서의 1-based index
    return `${dict.reviewImages.afterPhoto} ${overallIndex} / ${totalCount}`;
  }
}

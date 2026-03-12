// 리뷰 추천 도메인 엔티티 타입 정의
export interface ReviewRecommendRequest {
  reviewId: string;
  userId: string;
}

export interface ReviewRecommendResult {
  success: boolean;
  isRecommended: boolean;
  error?: string;
}

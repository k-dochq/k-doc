// 병원 좋아요 도메인 엔티티 타입 정의
export interface HospitalLikeRequest {
  hospitalId: string;
  userId: string;
}

export interface HospitalLikeStatusRequest {
  hospitalId: string;
  userId: string;
}

export interface HospitalLikeResult {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
}

export interface HospitalLikeStatusResult {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
}

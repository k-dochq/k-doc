/**
 * 의사 좋아요 요청 타입
 */
export interface DoctorLikeRequest {
  doctorId: string;
  userId: string;
}

/**
 * 의사 좋아요 결과 타입
 */
export interface DoctorLikeResult {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
}

/**
 * 의사 좋아요 상태 응답 타입
 */
export interface GetDoctorLikeStatusResponse {
  isLiked: boolean;
  likeCount: number;
}

/**
 * 의사 좋아요 토글 응답 타입
 */
export interface DoctorLikeToggleResponse {
  isLiked: boolean;
  likeCount: number;
}

/**
 * 의사 좋아요 에러 타입
 */
export interface DoctorLikeError {
  message: string;
  status?: number;
}

/**
 * 의사 좋아요 훅 옵션 타입
 */
export interface UseDoctorLikeOptions {
  doctorId: string;
  enabled?: boolean;
}

// 좋아요한 병원/리뷰 관련 도메인 타입 정의
import type { Hospital, District } from 'entities/hospital/api/entities/types';
import type { ReviewCardData } from 'entities/review/model/types';

export interface LikedHospitalsRequest {
  page: number;
  limit: number;
}

export interface LikedHospitalsResult {
  success: boolean;
  hospitals: LikedHospital[];
  totalCount: number;
  hasNextPage: boolean;
  nextPage: number | null;
  error?: string;
}

// Hospital 타입을 확장하여 isLiked 속성 추가
export interface LikedHospital extends Hospital {
  isLiked: boolean;
  district?: District | null;
}

export interface HospitalSpecialty {
  id: string;
  name: Record<string, string>;
  specialtyType: string;
}

// 좋아요한 리뷰 관련 타입
export interface GetLikedReviewsRequest {
  cursor?: string;
  limit: number;
}

export interface GetLikedReviewsResult {
  success: boolean;
  data?: {
    reviews: ReviewCardData[];
    nextCursor?: string;
    hasMore: boolean;
  };
  error?: string;
}

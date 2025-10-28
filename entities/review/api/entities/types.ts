import { type Prisma } from '@prisma/client';

// 리뷰 생성 요청 타입
export interface CreateReviewRequest {
  rating: number;
  content: string;
  procedureName: string; // concernsMultilingual에 저장됨
  medicalSpecialtyId: string;
  hospitalId: string;
  userId: string;
  beforeImageUrls: string[];
  afterImageUrls: string[];
}

// 리뷰 이미지 업로드 타입
export interface ReviewImageUpload {
  url: string;
  file: File;
  preview: string;
  type: 'BEFORE' | 'AFTER';
}

// 리뷰 생성 응답 타입
export interface CreateReviewResponse {
  success: boolean;
  reviewId?: string;
  error?: string;
  requestId?: string;
}

// 다국어 텍스트 타입 (Prisma JsonValue와 호환)
export type MultilingualText = {
  ko_KR: string;
  en_US: string;
  th_TH: string;
};

// Prisma Review 생성 데이터 타입
export type ReviewCreateData = {
  rating: number;
  content: MultilingualText;
  concernsMultilingual: MultilingualText;
  userId: string;
  hospitalId: string;
  medicalSpecialtyId: string;
  isRecommended: boolean;
};

// ReviewImage 생성 데이터 타입
export interface ReviewImageCreateData {
  reviewId: string;
  imageType: 'BEFORE' | 'AFTER';
  imageUrl: string;
  order: number;
  alt?: string;
  isActive: boolean;
}

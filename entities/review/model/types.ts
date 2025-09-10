import { type Prisma } from '@prisma/client';

// 기본 리뷰 타입 (Prisma에서 생성)
export type Review = Prisma.ReviewGetPayload<{
  include: {
    User: {
      select: {
        displayName: true;
        nickName: true;
      };
    };
    MedicalSpecialty: {
      select: {
        name: true;
      };
    };
    ReviewImage: {
      select: {
        id: true;
        imageType: true;
        imageUrl: true;
        alt: true;
        order: true;
      };
    };
  };
}>;

// 리뷰 이미지 타입
export type ReviewImage = {
  id: string;
  imageType: 'BEFORE' | 'AFTER';
  imageUrl: string;
  alt: string | null;
  order: number | null;
};

// 리뷰 카드에서 사용할 간소화된 타입
export type ReviewCardData = {
  id: string;
  rating: number;
  title: Record<string, string> | null;
  content: Record<string, string> | null;
  isRecommended: boolean;
  concerns: string | null;
  createdAt: Date;
  user: {
    displayName: string | null;
    nickName: string | null;
  };
  medicalSpecialty: {
    name: Record<string, string>;
  };
  images: ReviewImage[];
};

// 병원 리뷰 목록 조회 파라미터
export interface GetHospitalReviewsParams {
  hospitalId: string;
  page?: number;
  limit?: number;
  offset?: number;
}

// 병원 리뷰 목록 응답
export interface GetHospitalReviewsResponse {
  reviews: ReviewCardData[];
  totalCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasMore: boolean; // 기존 호환성을 위해 유지
}

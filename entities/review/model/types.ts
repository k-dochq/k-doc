import { MedicalSpecialtyType, type Prisma } from '@prisma/client';
import { type LocalizedText } from 'shared/lib/localized-text';

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

// 리뷰 이미지 타입 (필요한 필드만 선택)
export type ReviewImage = {
  id: string;
  imageType: 'BEFORE' | 'AFTER';
  imageUrl: string;
  alt: string | null;
  order: number | null;
};

// 기본 이미지 타입 (기본 이미지용)
export type DefaultImage = {
  imageUrl: string;
  alt: string;
};

// 이미지 표시용 유니온 타입
export type DisplayImage = ReviewImage | DefaultImage;

// 리뷰 카드에서 사용할 타입 (Prisma 타입을 기반으로 확장)
export type ReviewCardData = {
  id: string;
  rating: number;
  title: LocalizedText | null;
  content: LocalizedText | null;
  isRecommended: boolean;
  concerns: string | null;
  createdAt: Date;
  viewCount: number;
  likeCount: number;
  user: {
    displayName: string | null;
    nickName: string | null;
    name: string | null;
  };
  hospital: {
    name: LocalizedText;
    district: {
      name: LocalizedText;
    };
  };
  medicalSpecialty: {
    name: LocalizedText;
    specialtyType: string;
  };
  images: {
    before: ReviewImage[];
    after: ReviewImage[];
  };
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

// 전체 리뷰 목록 조회 파라미터
export interface GetAllReviewsParams {
  page?: number;
  limit?: number;
  offset?: number;
  category?: MedicalSpecialtyType | 'ALL';
  sortBy?: 'latest' | 'popular'; // 정렬 옵션
}

// 전체 리뷰 목록 응답
export interface GetAllReviewsResponse {
  reviews: ReviewCardData[];
  totalCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasMore: boolean; // 기존 호환성을 위해 유지
}

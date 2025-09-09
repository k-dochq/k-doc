import { type Prisma } from '@prisma/client';

export interface HospitalImage {
  id: string;
  hospitalId: string;
  imageType: 'MAIN' | 'THUMBNAIL' | 'PROMOTION' | 'DETAIL' | 'INTERIOR';
  imageUrl: string;
  alt: string | null;
  order: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Hospital {
  id: string;
  name: Prisma.JsonValue;
  rating: number;
  reviewCount: number;
  bookmarkCount: number;
  viewCount: number;
  approvalStatusType: 'PENDING' | 'APPROVED' | 'REJECTED';
  ranking: number | null;
  createdAt: Date;
  updatedAt: Date;
  mainImageUrl?: string | null; // 메인 이미지 URL (썸네일 이미지에서 추출)
  hospitalImages?: HospitalImage[]; // 병원 이미지 관계
}

export interface GetBestHospitalsRequest {
  limit?: number;
  minRating?: number;
  minReviewCount?: number;
}

export interface GetBestHospitalsResponse {
  hospitals: Hospital[];
}

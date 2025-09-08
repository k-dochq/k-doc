import { type Prisma } from '@prisma/client';

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
  mainImageUrl?: string | null; // 메인 이미지 URL
}

export interface GetBestHospitalsRequest {
  limit?: number;
  minRating?: number;
  minReviewCount?: number;
}

export interface GetBestHospitalsResponse {
  hospitals: Hospital[];
}

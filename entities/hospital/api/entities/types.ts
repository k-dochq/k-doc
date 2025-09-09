import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

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

export interface MedicalSpecialty {
  id: string;
  name: Prisma.JsonValue;
  specialtyType: MedicalSpecialtyType;
}

export interface Hospital {
  id: string;
  name: Prisma.JsonValue;
  address?: Prisma.JsonValue;
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
  medicalSpecialties?: MedicalSpecialty[]; // 진료 부위
}

export interface GetBestHospitalsRequest {
  limit?: number;
  minRating?: number;
  minReviewCount?: number;
}

export interface GetBestHospitalsResponse {
  hospitals: Hospital[];
}

export interface GetHospitalsRequest {
  page?: number;
  limit?: number;
  sortBy?: 'rating' | 'reviewCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  specialtyType?: MedicalSpecialtyType;
  minRating?: number;
}

export interface GetHospitalsResponse {
  hospitals: Hospital[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

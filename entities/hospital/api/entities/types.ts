import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { type DbHospitalQueryParams } from 'shared/model/types/hospital-query';
import { type PriceInfo } from 'shared/model/types';

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

export interface HospitalDoctor {
  id: string;
  name: Prisma.JsonValue;
  position?: Prisma.JsonValue;
  description?: string;
  genderType: 'MALE' | 'FEMALE';
  hospital: {
    id: string;
    name: Prisma.JsonValue;
  };
  medicalSpecialties: MedicalSpecialty[];
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Hospital {
  id: string;
  name: Prisma.JsonValue;
  address?: Prisma.JsonValue;
  rating: number;
  reviewCount: number;
  bookmarkCount: number;
  viewCount: number;
  likeCount: number; // 좋아요 수
  likedUserIds: string[]; // 좋아요를 한 사용자 ID들
  isLiked: boolean; // 현재 사용자의 좋아요 상태
  approvalStatusType: 'PENDING' | 'APPROVED' | 'REJECTED';
  ranking: number | null;
  createdAt: Date;
  updatedAt: Date;
  mainImageUrl?: string | null; // 메인 이미지 URL
  hospitalImages?: HospitalImage[]; // 병원 이미지 관계
  medicalSpecialties?: MedicalSpecialty[]; // 진료 부위
  doctors?: HospitalDoctor[]; // 소속 의사
  prices?: PriceInfo | null; // 가격 정보
  discountRate?: number | null; // 할인율
}

export interface GetBestHospitalsRequest {
  limit?: number;
  minRating?: number;
  minReviewCount?: number;
}

export interface GetBestHospitalsResponse {
  hospitals: Hospital[];
}

export interface GetHospitalsRequest extends Partial<DbHospitalQueryParams> {}

export interface GetHospitalsResponse {
  hospitals: Hospital[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

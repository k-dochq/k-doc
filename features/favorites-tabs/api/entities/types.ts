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

// 좋아요한 의사 관련 타입
export interface LikedDoctorsRequest {
  page: number;
  limit: number;
}

export interface LikedDoctorsResult {
  success: boolean;
  doctors: LikedDoctor[];
  totalCount: number;
  hasNextPage: boolean;
  nextPage: number | null;
  error?: string;
}

// Prisma 타입을 활용한 Doctor 타입 정의
import { type Prisma, type MedicalSpecialtyType, type DoctorImageType } from '@prisma/client';

// HospitalDoctor 타입과 호환되는 LikedDoctor 타입 정의
export interface LikedDoctor {
  id: string;
  name: Prisma.JsonValue;
  position?: Prisma.JsonValue;
  description?: string;
  genderType: 'MALE' | 'FEMALE';
  hospital: {
    id: string;
    name: Prisma.JsonValue;
  };
  medicalSpecialties: Array<{
    id: string;
    name: Prisma.JsonValue;
    specialtyType: MedicalSpecialtyType;
    description?: Prisma.JsonValue | null;
    order?: number | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  doctorImages?: Array<{
    id: string;
    doctorId: string;
    imageType: 'PROFILE';
    imageUrl: string;
    alt: string | null;
    order: number | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
}

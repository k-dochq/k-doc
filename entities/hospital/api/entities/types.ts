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

export interface DoctorImage {
  id: string;
  doctorId: string;
  imageType: 'PROFILE';
  imageUrl: string;
  alt: string | null;
  order: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  doctorImages?: DoctorImage[];
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

// District 타입을 Prisma에서 가져와서 사용 (JsonValue 타입 그대로 유지)
export type District = Prisma.DistrictGetPayload<{
  select: {
    id: true;
    name: true;
    displayName: true;
    countryCode: true;
    level: true;
    order: true;
    parentId: true;
  };
}>;

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
  latitude?: number | null; // 위도
  longitude?: number | null; // 경도
  district?: District | null; // 지역 정보
  displayLocationName?: Prisma.JsonValue | null; // 표시 지역명
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

import {
  type Prisma,
  type MedicalSpecialtyType,
  type HospitalImage as PrismaHospitalImage,
} from '@prisma/client';
import { type DbHospitalQueryParams } from 'shared/model/types/hospital-query';
import { type HospitalSortOption, type SortOrderOption } from 'shared/model/types/hospital-query';
import { type PriceInfo } from 'shared/model/types';
import { type DatabaseLocale } from 'shared/lib/localized-text';

// Prisma 모델 타입을 그대로 사용해 enum 추가 시 자동 반영되도록 처리
export type HospitalImage = PrismaHospitalImage;

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
  directions?: Prisma.JsonValue; // 병원 길찾기 정보 (다국어 JSON)
  description?: Prisma.JsonValue; // 병원 소개 (다국어 JSON)
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
  badge?: string[] | null; // 뱃지 배열
  /** 병원 상세 전용: 노출 가능한 리뷰 개수 (isActive !== false). View All/플로팅 버튼 활성화 여부에 사용 */
  activeReviewCount?: number;
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

export interface GetHospitalsRequestV2 {
  page?: number;
  limit?: number;
  sortBy?: HospitalSortOption;
  sortOrder?: SortOrderOption;
  specialtyType?: MedicalSpecialtyType;
  category?: 'RECOMMEND' | MedicalSpecialtyType;
  minRating?: number;
  search?: string;
  districtIds?: string[];
  locale?: DatabaseLocale;
}

export interface GetHospitalsResponse {
  hospitals: Hospital[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

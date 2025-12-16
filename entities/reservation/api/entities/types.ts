import { type Prisma } from '@prisma/client';

/**
 * HospitalMedicalSpecialty with MedicalSpecialty included
 */
export type HospitalMedicalSpecialtyWithSpecialty = Prisma.HospitalMedicalSpecialtyGetPayload<{
  include: {
    MedicalSpecialty: true;
  };
}>;

/**
 * 예약 정보와 병원 정보를 포함하는 타입
 */
export type ReservationWithHospital = Prisma.ReservationGetPayload<{
  include: {
    Hospital: {
      include: {
        HospitalImage: {
          where: {
            isActive: true;
          };
          select: {
            imageType: true;
            imageUrl: true;
          };
        };
        HospitalMedicalSpecialty: {
          include: {
            MedicalSpecialty: true;
          };
        };
        District: {
          select: {
            id: true;
            name: true;
            displayName: true;
            countryCode: true;
            level: true;
            order: true;
            parentId: true;
          };
        };
      };
    };
  };
}>;

/**
 * API 응답용 예약 병원 타입
 */
export interface ReservedHospitalData {
  id: string;
  name: Record<string, string>;
  address: Record<string, string>;
  rating: number;
  reviewCount: number;
  bookmarkCount: number;
  thumbnailUrl: string | null;
  hospitalImages: Array<{
    imageType: string;
    imageUrl: string;
  }>;
  prices: Prisma.JsonValue | null;
  discountRate: number | null;
  ranking: number | null;
  displayLocationName: Prisma.JsonValue | null;
  badge: string[] | null;
  district: {
    id: string;
    name: Prisma.JsonValue;
    displayName: Prisma.JsonValue | null;
    countryCode: string;
    level: number;
    order: number | null;
    parentId: string | null;
  } | null;
  specialties: Array<{
    id: string;
    name: Record<string, string>;
    type: string;
  }>;
  reservationInfo: {
    reservationId: string;
    reservationDate: Date;
    procedureName: string;
    status: string;
  };
}

/**
 * 예약 병원 목록 조회 응답 타입
 */
export interface GetUserReservedHospitalsResponse {
  hospitals: ReservedHospitalData[];
  hasNextPage: boolean;
  currentPage: number;
  totalCount: number;
}

/**
 * 예약 병원 목록 조회 파라미터
 */
export interface GetUserReservedHospitalsParams {
  userId: string;
  page: number;
  limit: number;
}

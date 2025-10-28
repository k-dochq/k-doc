import { type Prisma } from '@prisma/client';

/**
 * 예약 정보와 병원 정보를 포함하는 타입
 */
export type ReservationWithHospital = Prisma.ReservationGetPayload<{
  include: {
    Hospital: {
      include: {
        HospitalImage: {
          where: {
            imageType: 'THUMBNAIL';
            isActive: true;
          };
          orderBy: {
            order: 'asc';
          };
          take: 1;
        };
        HospitalMedicalSpecialty: {
          include: {
            MedicalSpecialty: true;
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

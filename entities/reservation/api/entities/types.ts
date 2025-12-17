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
 * 예약 내역 조회용 타입 (HospitalMedicalSpecialty 제외)
 */
export type ReservationWithHospitalForList = Prisma.ReservationGetPayload<{
  include: {
    Hospital: {
      include: {
        HospitalImage: {
          where: {
            isActive: true;
            imageType: {
              in: ['THUMBNAIL', 'LOGO'];
            };
          };
          select: {
            imageType: true;
            imageUrl: true;
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
 * 예약 상세 조회용 타입 (User 포함)
 */
export type ReservationWithHospitalAndUser = Prisma.ReservationGetPayload<{
  include: {
    Hospital: {
      include: {
        HospitalImage: {
          where: {
            isActive: true;
            imageType: {
              in: ['THUMBNAIL', 'LOGO'];
            };
          };
          select: {
            imageType: true;
            imageUrl: true;
          };
        };
        District: {
          select: {
            id: true;
            name: true;
            displayName: true;
            countryCode: true;
          };
        };
      };
    };
    User: {
      select: {
        id: true;
        name: true;
        phoneNumber: true;
        genderType: true;
        raw_user_meta_data: true;
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

/**
 * 개별 예약 정보 타입
 */
export interface ReservationData {
  id: string;
  reservationDate: Date;
  reservationTime: string;
  status: string;
  procedureName: string;
  hospital: {
    id: string;
    name: Record<string, string>;
    address: Record<string, string>;
    directions: Record<string, string> | null;
    latitude: number | null;
    longitude: number | null;
    thumbnailImageUrl: string | null;
    logoImageUrl: string | null;
    district: {
      id: string;
      name: Prisma.JsonValue;
      displayName: Prisma.JsonValue | null;
      countryCode: string;
    } | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 예약 내역 조회 응답 타입
 */
export interface GetUserReservationsResponse {
  reservations: ReservationData[];
  hasNextPage: boolean;
  currentPage: number;
  totalCount: number;
}

/**
 * 예약 내역 조회 파라미터
 */
export interface GetUserReservationsParams {
  userId: string;
  page: number;
  limit: number;
}

/**
 * 예약 상세 정보 타입
 */
export interface ReservationDetailData {
  id: string;
  reservationDate: Date;
  reservationTime: string;
  status: string;
  procedureName: string;
  depositAmount: number;
  currency: string;
  paymentDeadline: Date;
  hospital: {
    id: string;
    name: Record<string, string>;
    address: Record<string, string>;
    directions: Record<string, string> | null;
    latitude: number | null;
    longitude: number | null;
    thumbnailImageUrl: string | null;
    logoImageUrl: string | null;
    displayLocationName: Prisma.JsonValue | null;
    district: {
      id: string;
      name: Prisma.JsonValue;
      displayName: Prisma.JsonValue | null;
      countryCode: string;
    } | null;
  };
  user: {
    id: string;
    name: string | null;
    phoneNumber: string | null;
    passportName: string | null;
    gender: string | null;
    nationality: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 예약 상세 조회 파라미터
 */
export interface GetReservationDetailParams {
  reservationId: string;
  userId: string;
}

/**
 * 예약 상세 조회 응답 타입
 */
export interface GetReservationDetailResponse {
  reservation: ReservationDetailData;
}

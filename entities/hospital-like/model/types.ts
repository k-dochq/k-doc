import type { HospitalLike as PrismaHospitalLike } from '@prisma/client';

// Prisma 타입을 기반으로 한 HospitalLike 타입
export type HospitalLike = PrismaHospitalLike;

export interface CreateHospitalLikeRequest {
  hospitalId: string;
}

export interface DeleteHospitalLikeRequest {
  hospitalId: string;
}

export interface GetHospitalLikeStatusRequest {
  hospitalId: string;
}

export interface GetHospitalLikeStatusResponse {
  isLiked: boolean;
  likeCount: number;
}

export interface HospitalLikeToggleResponse {
  isLiked: boolean;
  likeCount: number;
}

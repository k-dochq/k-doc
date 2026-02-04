import { Prisma } from '@prisma/client';

export interface HospitalVideoAsset {
  localizedLinks: Prisma.JsonValue | null;
  fallbackUrl: string | null;
  alt: string | null;
  title: Prisma.JsonValue | null;
}

export interface HospitalProcedureImage {
  id: string;
  localizedLinks: Prisma.JsonValue | null;
  fallbackUrl: string | null;
  order: number | null;
  alt: string | null;
}

export interface GetHospitalVideosResponse {
  thumbnail: HospitalVideoAsset | null;
  video: HospitalVideoAsset | null;
  thumbnails: HospitalVideoAsset[]; // 모든 썸네일 이미지 (alt 기반 필터링용)
  videos: HospitalVideoAsset[]; // 모든 비디오 이미지 (alt 기반 필터링용)
  procedures: HospitalProcedureImage[];
}

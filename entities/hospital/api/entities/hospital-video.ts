import { Prisma } from '@prisma/client';

export interface HospitalVideoAsset {
  localizedLinks: Prisma.JsonValue | null;
  fallbackUrl: string | null;
  alt: string | null;
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
  procedures: HospitalProcedureImage[];
}

import { Prisma } from '@prisma/client';

export interface HospitalVideoAsset {
  localizedLinks: Prisma.JsonValue | null;
  fallbackUrl: string | null;
  alt: string | null;
}

export interface GetHospitalVideosResponse {
  thumbnail: HospitalVideoAsset | null;
  video: HospitalVideoAsset | null;
}

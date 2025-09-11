import { z } from 'zod';

// 좋아요한 병원 요청 스키마
export const likedHospitalsRequestSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(10),
});

export type LikedHospitalsRequestSchema = z.infer<typeof likedHospitalsRequestSchema>;

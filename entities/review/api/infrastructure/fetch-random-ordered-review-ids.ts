import { prisma } from 'shared/lib/prisma';
import { Prisma } from '@prisma/client';
import { type MedicalSpecialtyType } from '@prisma/client';

interface FetchRandomOrderedReviewIdsParams {
  seed: string;
  limit: number;
  offset: number;
  category?: MedicalSpecialtyType | 'ALL';
  hospitalId?: string;
}

/**
 * seed 기반 랜덤 정렬된 리뷰 ID 목록 조회
 * 추천순 정렬 시 사용
 */
export async function fetchRandomOrderedReviewIds({
  seed,
  limit,
  offset,
  category,
  hospitalId,
}: FetchRandomOrderedReviewIdsParams): Promise<string[]> {
  const result = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT id
    FROM "Review"
    WHERE "isActive" IS NOT FALSE
    ${category && category !== 'ALL' ? Prisma.sql`AND "medicalSpecialtyId" IN (
      SELECT id FROM "MedicalSpecialty" 
      WHERE "specialtyType" = ${category}::"MedicalSpecialtyType" 
      AND "isActive" = true
    )` : Prisma.empty}
    ${hospitalId ? Prisma.sql`AND "hospitalId" = ${hospitalId}` : Prisma.empty}
    ORDER BY MD5(CONCAT(id::text, ${seed}))
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return result.map((r) => r.id);
}

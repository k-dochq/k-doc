import { Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';

export type CurationRow = {
  id: string;
  position: number | null;
  curation_badge: string | null;
};

// 어드민에서 "추천" HospitalCategory 의 UUID (하드코딩 – DB 마이그레이션 없이 변경 불가)
export const RECOMMENDED_CATEGORY_ID = '893fa5bd-dc1d-48c7-ac46-78e72742d32c';

/**
 * Hospital LEFT JOIN HospitalCurationEntry 방식으로 DB에서 직접 정렬/페이지네이션.
 *
 * 카테고리 필터 전략:
 *  - RECOMMEND 탭: HospitalCategoryAssignment(추천 카테고리 할당)로 필터
 *                  → 큐레이션은 정렬(position) + 배지 전용
 *  - EYES 등 전문분야 탭: MedicalSpecialty.specialtyType으로 필터
 *                         → 큐레이션은 정렬(position) + 배지 전용
 *
 * 병원 리스트 페이지(getHospitalsV2)와 메인 인기병원 carousel(getBestHospitals)이 공유한다.
 */
export async function fetchSortedHospitalPage(params: {
  curationCategory: string | undefined;
  adminSortType: string;
  specialtyType?: string;
  specialtyTypes?: string[];
  districtIds?: string[];
  limit: number;
  offset: number;
}): Promise<{ rows: CurationRow[]; totalCount: number }> {
  const { curationCategory, adminSortType, specialtyType, specialtyTypes, districtIds, limit, offset } = params;

  // 큐레이션 리스트 서브쿼리: 없으면 NULL (LEFT JOIN이 전부 NULL 반환 → NULLS LAST로 뒤 배치)
  const listSubquery = curationCategory
    ? Prisma.sql`(SELECT id FROM "HospitalCurationList" WHERE category = ${curationCategory} AND "sortType" = ${adminSortType} LIMIT 1)`
    : Prisma.sql`NULL::uuid`;

  // ── RECOMMEND 탭 필터 ──────────────────────────────────────────────────────
  // 추천 카테고리가 할당된 병원만 표시 (HospitalCategoryAssignment 기반)
  const recommendFilter =
    curationCategory === 'RECOMMEND'
      ? Prisma.sql`AND EXISTS (
          SELECT 1 FROM "HospitalCategoryAssignment" hca
          WHERE hca."hospitalId" = h.id
            AND hca."categoryId" = ${RECOMMENDED_CATEGORY_ID}::uuid
        )`
      : Prisma.empty;

  // ── 전문분야 탭 필터 ───────────────────────────────────────────────────────
  // specialtyType 컬럼은 PostgreSQL enum("MedicalSpecialtyType")이므로 ::text 캐스팅 필요
  // RECOMMEND일 때는 specialtyType/specialtyTypes가 undefined이므로 자동으로 Prisma.empty
  const specialtyFilter =
    specialtyType
      ? Prisma.sql`AND EXISTS (
          SELECT 1 FROM "HospitalMedicalSpecialty" hms
          JOIN "MedicalSpecialty" ms ON ms.id = hms."medicalSpecialtyId"
          WHERE hms."hospitalId" = h.id
            AND ms."specialtyType"::text = ${specialtyType}
            AND ms."isActive" = true
        )`
      : specialtyTypes && specialtyTypes.length > 0
        ? Prisma.sql`AND EXISTS (
            SELECT 1 FROM "HospitalMedicalSpecialty" hms
            JOIN "MedicalSpecialty" ms ON ms.id = hms."medicalSpecialtyId"
            WHERE hms."hospitalId" = h.id
              AND ms."specialtyType"::text = ANY(${specialtyTypes}::text[])
              AND ms."isActive" = true
          )`
        : Prisma.empty;

  // 지역 필터
  const districtFilter =
    districtIds && districtIds.length > 0
      ? Prisma.sql`AND h."districtId" = ANY(${districtIds}::uuid[])`
      : Prisma.empty;

  // ── 정렬 기준 ──────────────────────────────────────────────────────────────
  //  - 인기순(POPULAR): 큐레이션 position 기준 (admin 수동 정렬)
  //  - 최신순(NEWEST): 병원 등록일 내림차순
  //  - 리뷰많은순(RECOMMENDED): 리뷰 수 내림차순
  // (멤버십은 LEFT JOIN + 할당 필터라 큐레이션 등록 여부와 무관하게 모두 노출됨)
  const orderClause =
    adminSortType === 'NEWEST'
      ? Prisma.sql`ORDER BY h."createdAt" DESC, h.id ASC`
      : adminSortType === 'RECOMMENDED'
        ? Prisma.sql`ORDER BY (SELECT COUNT(*) FROM "Review" r WHERE r."hospitalId" = h.id) DESC, h.id ASC`
        : Prisma.sql`ORDER BY e.position ASC NULLS LAST, h.rating DESC`;

  const [countResult, rows] = await Promise.all([
    prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) AS count
      FROM "Hospital" h
      WHERE h."isActive" = true
      ${recommendFilter}
      ${specialtyFilter}
      ${districtFilter}
    `,
    prisma.$queryRaw<CurationRow[]>`
      SELECT h.id, e.position, e.badge AS curation_badge
      FROM "Hospital" h
      LEFT JOIN "HospitalCurationEntry" e
        ON  e."hospitalId" = h.id
        AND e."listId"     = ${listSubquery}
        AND e."isVisible"  = true
      WHERE h."isActive" = true
      ${recommendFilter}
      ${specialtyFilter}
      ${districtFilter}
      ${orderClause}
      LIMIT  ${limit}
      OFFSET ${offset}
    `,
  ]);

  return { rows, totalCount: Number(countResult[0].count) };
}

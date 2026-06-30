import { Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import {
  type Hospital,
  type GetHospitalsRequestV2,
  type GetHospitalsResponse,
} from '../entities/types';
import { DEFAULT_HOSPITAL_QUERY_PARAMS } from 'shared/model/types/hospital-query';
import { getHospitalMainImageUrl } from '../../lib/image-utils';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from '../../lib/image-utils';
import { buildHospitalOrderBy } from '../lib/build-hospital-order-by';
import { fetchSortedHospitalPage } from '../lib/fetch-sorted-hospital-page';
import { searchHospitalIds } from 'shared/lib/meilisearch';

// k-doc sort 파라미터 → admin HospitalCurationList.sortType 변환
function toAdminSortType(sortBy: string): string {
  const map: Record<string, string> = {
    popular: 'POPULAR',
    recommended: 'RECOMMENDED',
    newest: 'NEWEST',
  };
  return map[sortBy] ?? 'POPULAR';
}

// Prisma 타입 정의
type HospitalWithRelations = Prisma.HospitalGetPayload<{
  include: {
    HospitalImage: { select: { imageType: true; imageUrl: true } };
    HospitalMedicalSpecialty: { include: { MedicalSpecialty: true } };
    HospitalSpecialtyBadge: { select: { medicalSpecialtyId: true; badge: true } };
    HospitalLike: { select: { userId: true } };
    District: {
      select: {
        id: true; name: true; displayName: true; countryCode: true;
        level: true; order: true; parentId: true;
      };
    };
    _count: { select: { HospitalLike: true; Review: true } };
  };
}>;

function buildHospitalInclude() {
  return {
    HospitalImage: {
      where: { isActive: true },
      orderBy: [{ imageType: 'asc' }, { order: 'asc' }] as { imageType: 'asc' }[],
      select: { imageType: true, imageUrl: true },
    },
    HospitalMedicalSpecialty: {
      include: {
        MedicalSpecialty: {
          select: {
            id: true, name: true, specialtyType: true, description: true,
            order: true, isActive: true, createdAt: true, updatedAt: true,
            parentSpecialtyId: true,
          },
        },
      },
      where: { MedicalSpecialty: { isActive: true } },
    },
    HospitalSpecialtyBadge: { select: { medicalSpecialtyId: true, badge: true } },
    HospitalLike: { select: { userId: true } },
    District: {
      select: {
        id: true, name: true, displayName: true, countryCode: true,
        level: true, order: true, parentId: true,
      },
    },
    _count: { select: { HospitalLike: true, Review: true } },
  };
}

function transformHospital(hospital: HospitalWithRelations, resolvedBadge: string[] | null) {
  const likedUserIds = hospital.HospitalLike.map((like) => like.userId);
  return {
    id: hospital.id,
    name: parseLocalizedText(hospital.name),
    address: parseLocalizedText(hospital.address),
    prices: parsePriceInfo(hospital.prices),
    rating: hospital.rating,
    reviewCount: hospital._count.Review,
    thumbnailImageUrl: getHospitalThumbnailImageUrl(hospital.HospitalImage),
    discountRate: hospital.discountRate,
    medicalSpecialties:
      hospital.HospitalMedicalSpecialty?.map((hms) => ({
        id: hms.MedicalSpecialty.id,
        name: parseLocalizedText(hms.MedicalSpecialty.name),
        specialtyType: hms.MedicalSpecialty.specialtyType,
        parentSpecialtyId: hms.MedicalSpecialty.parentSpecialtyId ?? undefined,
        order: hms.MedicalSpecialty.order ?? undefined,
      })) || [],
    displayLocationName: parseLocalizedText(hospital.displayLocationName || '{}'),
    district: hospital.District
      ? {
          id: hospital.District.id,
          name: hospital.District.name,
          displayName: hospital.District.displayName,
          countryCode: hospital.District.countryCode,
          level: hospital.District.level,
          order: hospital.District.order,
          parentId: hospital.District.parentId,
        }
      : null,
    likeCount: hospital._count.HospitalLike,
    likedUserIds,
    isLiked: false,
    bookmarkCount: hospital.bookmarkCount,
    viewCount: hospital.viewCount,
    approvalStatusType: hospital.approvalStatusType,
    ranking: hospital.ranking,
    createdAt: hospital.createdAt,
    updatedAt: hospital.updatedAt,
    mainImageUrl: getHospitalMainImageUrl(hospital.HospitalImage),
    hospitalImages: hospital.HospitalImage,
    latitude: hospital.latitude,
    longitude: hospital.longitude,
    badge: resolvedBadge,
  };
}

// 큐레이션 정렬/페이지네이션은 공유 lib(fetchSortedHospitalPage)로 분리됨

export async function getHospitalsV2(
  request: GetHospitalsRequestV2 = {},
): Promise<GetHospitalsResponse> {
  try {
    const {
      page = DEFAULT_HOSPITAL_QUERY_PARAMS.page,
      limit = DEFAULT_HOSPITAL_QUERY_PARAMS.limit,
      sortBy = DEFAULT_HOSPITAL_QUERY_PARAMS.sort,
      sortOrder = DEFAULT_HOSPITAL_QUERY_PARAMS.sortOrder,
      specialtyType,
      specialtyTypes,
      category,
      minRating = DEFAULT_HOSPITAL_QUERY_PARAMS.minRating,
      search,
      districtIds,
    } = request;

    const offset = (page - 1) * limit;

    // ─────────────────────────────────────────────────────────────────
    // 검색 경로: Meilisearch + 일반 DB 쿼리 (기존 로직 유지)
    // ─────────────────────────────────────────────────────────────────
    if (search) {
      const meilisearchIds = await searchHospitalIds(search);
      if (meilisearchIds !== null && meilisearchIds.length === 0) {
        return { hospitals: [], totalCount: 0, currentPage: page, totalPages: 0, hasNextPage: false };
      }

      const where: Prisma.HospitalWhereInput = {
        isActive: true,
        rating: { gte: minRating },
        AND: [
          ...(meilisearchIds !== null ? [{ id: { in: meilisearchIds } }] : []),
          ...(specialtyType
            ? [{ HospitalMedicalSpecialty: { some: { MedicalSpecialty: { specialtyType, isActive: true } } } }]
            : []),
          ...(specialtyTypes && specialtyTypes.length > 0
            ? [{ HospitalMedicalSpecialty: { some: { MedicalSpecialty: { specialtyType: { in: specialtyTypes }, isActive: true } } } }]
            : []),
          ...(districtIds && districtIds.length > 0 ? [{ districtId: { in: districtIds } }] : []),
        ],
      };

      const [totalCount, hospitals] = await Promise.all([
        prisma.hospital.count({ where }),
        prisma.hospital.findMany({
          where,
          orderBy: buildHospitalOrderBy(sortBy, sortOrder),
          include: buildHospitalInclude(),
          skip: offset,
          take: limit,
        }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);
      return {
        hospitals: (hospitals as HospitalWithRelations[]).map((h) =>
          transformHospital(h, h.badge),
        ) as unknown as Hospital[],
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
      };
    }

    // ─────────────────────────────────────────────────────────────────
    // 비검색 경로: Hospital LEFT JOIN CurationEntry
    // DB가 position 정렬 + 페이지네이션을 직접 처리
    // ─────────────────────────────────────────────────────────────────
    const curationCategory = category === 'RECOMMEND' ? 'RECOMMEND' : specialtyType;
    const adminSortType = toAdminSortType(sortBy);

    const { rows, totalCount } = await fetchSortedHospitalPage({
      curationCategory,
      adminSortType,
      specialtyType,
      specialtyTypes,
      districtIds,
      limit,
      offset,
    });

    if (rows.length === 0) {
      return { hospitals: [], totalCount, currentPage: page, totalPages: 0, hasNextPage: false };
    }

    // 페이지 ID 목록 + 큐레이션 데이터 Map
    const pageIds = rows.map((r) => r.id);
    const curationMap = new Map(rows.map((r) => [r.id, r]));

    // Relations는 Prisma로 로드 (ID 교집합 → 쿼리 최소화)
    const hospitalsRaw = await prisma.hospital.findMany({
      where: { id: { in: pageIds } },
      include: buildHospitalInclude(),
    });

    // DB 정렬 순서 복원 (findMany는 순서 보장 안 함)
    const hospitalMap = new Map(hospitalsRaw.map((h) => [h.id, h]));

    const transformedHospitals = pageIds
      .map((id) => {
        const hospital = hospitalMap.get(id);
        if (!hospital) return null;

        const entry = curationMap.get(id);
        // 추천탭: hospital.badge(기본 배지), 카테고리탭: curation entry.badge
        const badge =
          category === 'RECOMMEND'
            ? ((hospital.badge as string[]) ?? null)
            : entry?.curation_badge
              ? [entry.curation_badge]
              : null;

        return transformHospital(hospital as unknown as HospitalWithRelations, badge);
      })
      .filter(Boolean);

    const totalPages = Math.ceil(totalCount / limit);
    return {
      hospitals: transformedHospitals as unknown as Hospital[],
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
    };
  } catch (error) {
    throw handleDatabaseError(error, 'getHospitalsV2');
  }
}

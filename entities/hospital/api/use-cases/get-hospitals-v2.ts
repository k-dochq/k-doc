import { type Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import {
  type Hospital,
  type GetHospitalsRequestV2,
  type GetHospitalsResponse,
} from '../entities/types';
import { DEFAULT_HOSPITAL_QUERY_PARAMS } from 'shared/model/types/hospital-query';
import { getHospitalMainImageUrl } from '../../lib/image-utils';
import { type HospitalCardData, parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from '../../lib/image-utils';
import { buildHospitalOrderBy } from '../lib/build-hospital-order-by';
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
    HospitalImage: {
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
    HospitalSpecialtyBadge: {
      select: {
        medicalSpecialtyId: true;
        badge: true;
      };
    };
    HospitalLike: {
      select: {
        userId: true;
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
    _count: {
      select: {
        HospitalLike: true;
        Review: true;
      };
    };
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
            id: true,
            name: true,
            specialtyType: true,
            description: true,
            order: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            parentSpecialtyId: true,
          },
        },
      },
      where: { MedicalSpecialty: { isActive: true } },
    },
    HospitalSpecialtyBadge: {
      select: { medicalSpecialtyId: true, badge: true },
    },
    HospitalLike: { select: { userId: true } },
    District: {
      select: {
        id: true,
        name: true,
        displayName: true,
        countryCode: true,
        level: true,
        order: true,
        parentId: true,
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
      locale,
    } = request;

    const offset = (page - 1) * limit;

    // 검색어가 있으면 Meilisearch에서 매칭 병원 ID 조회
    let meilisearchIds: string[] | null = null;
    if (search) {
      meilisearchIds = await searchHospitalIds(search);
    }

    // 검색 결과가 없으면 빈 응답 반환
    if (meilisearchIds !== null && meilisearchIds.length === 0) {
      return {
        hospitals: [],
        totalCount: 0,
        currentPage: page,
        totalPages: 0,
        hasNextPage: false,
      };
    }

    // ─────────────────────────────────────────────────────────────────
    // 큐레이션 기반 정렬: 추천탭 또는 카테고리탭, 검색 없는 경우
    // admin 정렬관리의 position 순서를 그대로 사용
    // ─────────────────────────────────────────────────────────────────
    const isCurationTab = (!!specialtyType || category === 'RECOMMEND') && !search;

    if (isCurationTab) {
      const curationCategory = category === 'RECOMMEND' ? 'RECOMMEND' : specialtyType!;
      const adminSortType = toAdminSortType(sortBy);

      const list = await prisma.hospitalCurationList.findUnique({
        where: { category_sortType: { category: curationCategory, sortType: adminSortType } },
        select: { id: true },
      });

      if (!list) {
        return { hospitals: [], totalCount: 0, currentPage: page, totalPages: 0, hasNextPage: false };
      }

      // ── 카테고리탭 + 추천탭: HospitalCurationEntry.position 기준 정렬 ──────
      // RECOMMEND 탭은 스크립트에서 전체 BEST → 전체 HOT 순으로 position을 부여하므로
      // position ASC만으로 BEST→HOT 순서가 자연스럽게 유지됨
      const entryWhere = {
        listId: list.id,
        isVisible: true,
        Hospital: {
          isActive: true,
          ...(districtIds && districtIds.length > 0 ? { districtId: { in: districtIds } } : {}),
        },
      };

      const [totalCount, entries] = await Promise.all([
        prisma.hospitalCurationEntry.count({ where: entryWhere }),
        prisma.hospitalCurationEntry.findMany({
          where: entryWhere,
          orderBy: { position: 'asc' },
          skip: offset,
          take: limit,
          select: {
            badge: true,
            Hospital: { include: buildHospitalInclude() },
          },
        }),
      ]);

      const transformedHospitals = entries.map((entry) => {
        const hospital = entry.Hospital as unknown as HospitalWithRelations;
        return transformHospital(hospital, entry.badge ? [entry.badge] : null);
      });

      const totalPages = Math.ceil(totalCount / limit);
      return {
        hospitals: transformedHospitals as unknown as Hospital[],
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
      };
    }

    // ─────────────────────────────────────────────────────────────────
    // 일반 DB 정렬: 검색(Meilisearch) 또는 기타 필터 조건
    // ─────────────────────────────────────────────────────────────────
    const where: Prisma.HospitalWhereInput = {
      isActive: true,
      rating: { gte: minRating },
      AND: [
        ...(meilisearchIds !== null ? [{ id: { in: meilisearchIds } }] : []),
        ...(specialtyType
          ? [
              {
                HospitalMedicalSpecialty: {
                  some: {
                    MedicalSpecialty: { specialtyType: specialtyType, isActive: true },
                  },
                },
              },
            ]
          : []),
        ...(specialtyTypes && specialtyTypes.length > 0
          ? [
              {
                HospitalMedicalSpecialty: {
                  some: {
                    MedicalSpecialty: { specialtyType: { in: specialtyTypes }, isActive: true },
                  },
                },
              },
            ]
          : []),
        ...(districtIds && districtIds.length > 0
          ? [{ districtId: { in: districtIds } }]
          : []),
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

    const transformedHospitals = (hospitals as HospitalWithRelations[]).map((hospital) =>
      transformHospital(hospital, hospital.badge),
    );

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

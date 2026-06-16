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
import {
  HARDCODED_BADGES,
  HARDCODED_RECOMMEND_ORDER,
  getRecommendBadge,
  sortHospitalsByHardcodedOrder,
} from '../../lib/hardcoded-hospital-badges';

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

    // 필터 조건 설정
    const where: Prisma.HospitalWhereInput = {
      isActive: true,
      rating: {
        gte: minRating,
      },
      // 검색 조건과 카테고리 필터를 AND 조건으로 결합
      AND: [
        // Meilisearch 검색 결과 ID 필터
        ...(meilisearchIds !== null ? [{ id: { in: meilisearchIds } }] : []),
        // 진료 부위 필터링 (단일)
        ...(specialtyType
          ? [
              {
                HospitalMedicalSpecialty: {
                  some: {
                    MedicalSpecialty: {
                      specialtyType: specialtyType,
                      isActive: true,
                    },
                  },
                },
              },
            ]
          : []),
        // 진료 부위 복수 필터링
        ...(specialtyTypes && specialtyTypes.length > 0
          ? [
              {
                HospitalMedicalSpecialty: {
                  some: {
                    MedicalSpecialty: {
                      specialtyType: { in: specialtyTypes },
                      isActive: true,
                    },
                  },
                },
              },
            ]
          : []),
        // 지역 필터링
        ...(districtIds && districtIds.length > 0
          ? [
              {
                districtId: {
                  in: districtIds,
                },
              },
            ]
          : []),
        // 추천 카테고리 필터링: 하드코딩된 ID 목록으로 조회
        ...(category === 'RECOMMEND'
          ? [{ id: { in: HARDCODED_RECOMMEND_ORDER } }]
          : []),
      ],
    };

    // 총 개수 조회
    const totalCount = await prisma.hospital.count({ where });

    // 정렬 로직 구성
    const orderBy = buildHospitalOrderBy(sortBy, sortOrder);

    // 하드코딩 정렬이 필요한 경우: 카테고리 필터 또는 추천 탭
    const useHardcodedSort = !!specialtyType || category === 'RECOMMEND';

    // 병원 데이터 조회
    const hospitals: HospitalWithRelations[] = await prisma.hospital.findMany({
      where,
      orderBy: useHardcodedSort ? undefined : orderBy,
      include: {
        HospitalImage: {
          where: {
            isActive: true,
          },
          orderBy: [
            { imageType: 'asc' }, // MAIN이 먼저 오도록
            { order: 'asc' },
          ],
          select: {
            imageType: true,
            imageUrl: true,
          },
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
          where: {
            MedicalSpecialty: {
              isActive: true,
            },
          },
        },
        HospitalSpecialtyBadge: {
          select: {
            medicalSpecialtyId: true,
            badge: true,
          },
        },
        HospitalLike: {
          select: {
            userId: true,
          },
        },
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
        _count: {
          select: {
            HospitalLike: true,
            Review: true,
          },
        },
      },
      skip: useHardcodedSort ? undefined : offset,
      take: useHardcodedSort ? undefined : limit,
    });

    // 하드코딩 정렬이 필요할 때: 인메모리 정렬 후 페이지네이션
    const sortedHospitals = (() => {
      if (!useHardcodedSort) return hospitals;

      if (category === 'RECOMMEND') {
        // 추천 탭: HARDCODED_RECOMMEND_ORDER 순서대로 (이미 BEST→HOT 정렬됨)
        const indexMap = new Map(HARDCODED_RECOMMEND_ORDER.map((id, i) => [id, i]));
        const sorted = [...hospitals].sort((a, b) => {
          const posA = indexMap.get(a.id) ?? Infinity;
          const posB = indexMap.get(b.id) ?? Infinity;
          return posA - posB;
        });
        return sorted.slice(offset, offset + limit);
      }

      // 카테고리 필터: BEST→HOT→없음 순 정렬
      return sortHospitalsByHardcodedOrder(hospitals, specialtyType!).slice(
        offset,
        offset + limit,
      );
    })();

    // 데이터 변환 - HospitalCardData 타입으로 변환
    const transformedHospitals: HospitalCardData[] = sortedHospitals.map((hospital) => {
      const likedUserIds = hospital.HospitalLike.map((like) => like.userId);

      // 배지 결정:
      // - 카테고리 필터: 해당 카테고리의 하드코딩 배지 (없으면 null)
      // - 추천 탭: 모든 카테고리 중 BEST 우선, 없으면 HOT (없으면 null)
      // - 그 외(전체 목록 등): 글로벌 hospital.badge 사용
      const resolvedBadge = (() => {
        if (specialtyType) {
          const hardcoded = HARDCODED_BADGES[hospital.id]?.[specialtyType];
          return hardcoded ? [hardcoded] : null;
        }
        if (category === 'RECOMMEND') {
          const badge = getRecommendBadge(hospital.id);
          return badge ? [badge] : null;
        }
        return hospital.badge;
      })();

      return {
        id: hospital.id,
        name: parseLocalizedText(hospital.name),
        address: parseLocalizedText(hospital.address),
        prices: parsePriceInfo(hospital.prices),
        rating: hospital.rating,
        reviewCount: hospital._count.Review, // 실제 리뷰 개수 사용
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
        // 좋아요 관련 필드 추가
        likeCount: hospital._count.HospitalLike,
        likedUserIds,
        isLiked: false, // 기본값으로 false 설정 (클라이언트에서 처리)
        // Hospital 타입과의 호환성을 위한 추가 필드들
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
    });

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    return {
      hospitals: transformedHospitals as unknown as Hospital[], // 타입 호환성을 위해 안전한 캐스팅
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage,
    };
  } catch (error) {
    throw handleDatabaseError(error, 'getHospitalsV2');
  }
}

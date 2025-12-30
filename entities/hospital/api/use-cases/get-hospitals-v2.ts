import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError, extractLocalizedText } from 'shared/lib';
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

type HospitalImageData = {
  imageType: string;
  isActive: boolean;
  imageUrl: string;
};

/**
 * 검색어를 대소문자 변형으로 변환하는 헬퍼 함수
 * 원본, 전체 대문자, 전체 소문자, 첫 글자 대문자 변형을 반환
 */
function generateSearchVariations(search: string): string[] {
  const variations = [search]; // 원본 검색어
  variations.push(search.toUpperCase()); // 전체 대문자
  variations.push(search.toLowerCase()); // 전체 소문자
  // 첫 글자 대문자 변형 (예: "windy" → "Windy")
  if (search.length > 0) {
    variations.push(search.charAt(0).toUpperCase() + search.slice(1).toLowerCase());
  }
  // 중복 제거
  return Array.from(new Set(variations));
}

// 메인 이미지 URL 추출 헬퍼 함수

// 추천 카테고리 ID (하드코딩)
const RECOMMENDED_CATEGORY_ID = '893fa5bd-dc1d-48c7-ac46-78e72742d32c';

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
      category,
      minRating = DEFAULT_HOSPITAL_QUERY_PARAMS.minRating,
      search,
      districtIds,
      locale,
    } = request;

    const offset = (page - 1) * limit;

    // 검색 조건 설정 (병원명 또는 시술부위에서 다국어 검색)
    const searchConditions: Prisma.HospitalWhereInput[] = [];

    if (search) {
      // 현재 선택된 locale에 따라 해당 언어만 검색
      const searchLocale = locale || 'en_US'; // 기본값은 영어

      // 영어 검색어인지 확인
      const isEnglishSearch = /^[a-zA-Z\s]+$/.test(search);
      // 시술부위 검색에서 사용할 첫 글자 대문자 변형 (병원명 검색에서는 사용하지 않음)
      const capitalizedSearch =
        isEnglishSearch && search.length > 0
          ? search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()
          : search;

      // 병원명에서 검색 (현재 locale에 해당하는 언어만)
      const hospitalNameConditions: Prisma.HospitalWhereInput[] = [];

      // en_US 로케일에만 대소문자 변형 적용
      if (searchLocale === 'en_US' && isEnglishSearch) {
        const searchVariations = generateSearchVariations(search);
        // 각 변형에 대해 조건 생성
        const enUSConditions = searchVariations.map((variation) => ({
          name: {
            path: ['en_US'],
            string_contains: variation,
          },
        }));
        hospitalNameConditions.push(...enUSConditions);
      } else {
        // 다른 언어 또는 영어가 아닌 경우 원본만 사용
        hospitalNameConditions.push({
          name: {
            path: [searchLocale],
            string_contains: search,
          },
        });
      }

      searchConditions.push({
        OR: hospitalNameConditions,
      });

      // 시술부위에서 검색 (현재 locale에 해당하는 언어만)
      const specialtyConditions: Prisma.MedicalSpecialtyWhereInput[] = [];

      // 영어 검색어인 경우 원본과 첫 글자 대문자 버전 모두 검색
      if (searchLocale === 'en_US' && isEnglishSearch) {
        specialtyConditions.push(
          {
            name: {
              path: ['en_US'],
              string_contains: search,
            },
          },
          {
            name: {
              path: ['en_US'],
              string_contains: capitalizedSearch,
            },
          },
        );
      } else {
        specialtyConditions.push({
          name: {
            path: [searchLocale],
            string_contains: search,
          },
        });
      }

      searchConditions.push({
        HospitalMedicalSpecialty: {
          some: {
            MedicalSpecialty: {
              isActive: true,
              OR: specialtyConditions,
            },
          },
        },
      });
    }

    // 필터 조건 설정
    const where: Prisma.HospitalWhereInput = {
      approvalStatusType: {
        not: 'REJECTED',
      },
      rating: {
        gte: minRating,
      },
      // 검색 조건과 카테고리 필터를 AND 조건으로 결합
      AND: [
        // 검색 조건 (병원명 또는 시술부위)
        ...(searchConditions.length > 0 ? [{ OR: searchConditions }] : []),
        // 진료 부위 필터링
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
        // 추천 카테고리 필터링
        ...(category === 'RECOMMEND'
          ? [
              {
                HospitalCategoryAssignment: {
                  some: {
                    categoryId: RECOMMENDED_CATEGORY_ID,
                  },
                },
              },
            ]
          : []),
      ],
    };

    // 총 개수 조회
    const totalCount = await prisma.hospital.count({ where });

    // 정렬 로직 구성
    const orderBy = buildHospitalOrderBy(sortBy, sortOrder);

    // 병원 데이터 조회
    const hospitals: HospitalWithRelations[] = await prisma.hospital.findMany({
      where,
      orderBy,
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
              },
            },
          },
          where: {
            MedicalSpecialty: {
              isActive: true,
            },
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
      skip: offset,
      take: limit,
    });

    // 데이터 변환 - HospitalCardData 타입으로 변환
    const transformedHospitals: HospitalCardData[] = hospitals.map((hospital) => {
      const likedUserIds = hospital.HospitalLike.map((like) => like.userId);

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
        badge: hospital.badge,
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

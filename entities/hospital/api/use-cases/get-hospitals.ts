import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError, extractLocalizedText } from 'shared/lib';
import {
  type Hospital,
  type GetHospitalsRequest,
  type GetHospitalsResponse,
} from '../entities/types';
import { DEFAULT_HOSPITAL_QUERY_PARAMS, type DbSortField } from 'shared/model/types/hospital-query';
import { getHospitalMainImageUrl } from '../../lib/image-utils';
import { type HospitalCardData, parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from '../../lib/image-utils';

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

// 메인 이미지 URL 추출 헬퍼 함수

export async function getHospitals(
  request: GetHospitalsRequest = {},
): Promise<GetHospitalsResponse> {
  try {
    const {
      page = DEFAULT_HOSPITAL_QUERY_PARAMS.page,
      limit = DEFAULT_HOSPITAL_QUERY_PARAMS.limit,
      sortBy = 'rating' as DbSortField,
      sortOrder = DEFAULT_HOSPITAL_QUERY_PARAMS.sortOrder,
      specialtyType,
      minRating = DEFAULT_HOSPITAL_QUERY_PARAMS.minRating,
      search,
      districtIds,
    } = request;

    const offset = (page - 1) * limit;

    // 정렬 조건 설정
    const orderBy: Prisma.HospitalOrderByWithRelationInput[] = [];

    if (sortBy === 'rating') {
      // 인기순 (평점 기준)
      orderBy.push({ rating: sortOrder });
      orderBy.push({ reviewCount: 'desc' }); // 동일 평점일 때 리뷰 수 많은 순
      orderBy.push({ createdAt: 'desc' }); // 최종적으로 최신순
    } else if (sortBy === 'likeCount') {
      // 추천순 (좋아요 수 기준)
      orderBy.push({
        HospitalLike: {
          _count: sortOrder,
        },
      });
      orderBy.push({ rating: 'desc' }); // 동일 좋아요 수일 때 평점 높은 순
      orderBy.push({ createdAt: 'desc' }); // 최종적으로 최신순
    } else if (sortBy === 'viewCount') {
      // 조회순 (조회수 기준)
      orderBy.push({ viewCount: sortOrder });
      orderBy.push({ createdAt: 'desc' }); // 동일 조회수일 때 최신순
    } else if (sortBy === 'createdAt') {
      // 최신순
      orderBy.push({ createdAt: sortOrder });
    } else {
      // 기본값: 평점순
      orderBy.push({ rating: 'desc' });
      orderBy.push({ reviewCount: 'desc' });
      orderBy.push({ createdAt: 'desc' });
    }

    // 검색 조건 설정 (병원명 또는 시술부위에서 다국어 검색)
    const searchConditions: Prisma.HospitalWhereInput[] = [];

    if (search) {
      // 병원명에서 검색 (다국어 지원)
      searchConditions.push({
        OR: [
          {
            name: {
              path: ['ko_KR'],
              string_contains: search,
            },
          },
          {
            name: {
              path: ['en_US'],
              string_contains: search,
            },
          },
          {
            name: {
              path: ['th_TH'],
              string_contains: search,
            },
          },
        ],
      });

      // 시술부위에서 검색 (다국어 지원)
      searchConditions.push({
        HospitalMedicalSpecialty: {
          some: {
            MedicalSpecialty: {
              isActive: true,
              OR: [
                {
                  name: {
                    path: ['ko_KR'],
                    string_contains: search,
                  },
                },
                {
                  name: {
                    path: ['en_US'],
                    string_contains: search,
                  },
                },
                {
                  name: {
                    path: ['th_TH'],
                    string_contains: search,
                  },
                },
              ],
            },
          },
        },
      });
    }

    // 필터 조건 설정
    const where: Prisma.HospitalWhereInput = {
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
      ],
    };

    // 총 개수 조회
    const totalCount = await prisma.hospital.count({ where });

    // 병원 데이터 조회
    const hospitals: HospitalWithRelations[] = await prisma.hospital.findMany({
      where,
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
      orderBy,
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
        latitude: hospital.latitude,
        longitude: hospital.longitude,
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
    throw handleDatabaseError(error, 'getHospitals');
  }
}

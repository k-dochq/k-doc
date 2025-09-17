import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError, extractLocalizedText } from 'shared/lib';
import {
  type Hospital,
  type GetHospitalsRequest,
  type GetHospitalsResponse,
} from '../entities/types';
import { DEFAULT_HOSPITAL_QUERY_PARAMS, type DbSortField } from 'shared/model/types/hospital-query';

// Prisma 타입 정의
type HospitalWithRelations = Prisma.HospitalGetPayload<{
  include: {
    HospitalImage: true;
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
function extractMainImageUrl(hospitalImages?: HospitalImageData[]): string | null {
  if (!hospitalImages || hospitalImages.length === 0) return null;

  const mainImage = hospitalImages.find(
    (img) => img.imageType === 'MAIN' && img.isActive && img.imageUrl,
  );

  return mainImage?.imageUrl || null;
}

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
      // 평점순
      orderBy.push({ rating: sortOrder });
      orderBy.push({ reviewCount: 'desc' }); // 동일 평점일 때 리뷰 수 많은 순
      orderBy.push({ createdAt: 'desc' }); // 최종적으로 최신순
    } else if (sortBy === 'viewCount') {
      // 인기순 (조회수 기준)
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
      approvalStatusType: 'APPROVED',
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
            imageType: 'MAIN',
            isActive: true,
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          take: 1,
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
          },
        },
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    // 데이터 변환
    const transformedHospitals: Hospital[] = hospitals.map((hospital) => {
      const likedUserIds = hospital.HospitalLike.map((like) => like.userId);

      return {
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        rating: hospital.rating,
        reviewCount: hospital.reviewCount,
        bookmarkCount: hospital.bookmarkCount,
        viewCount: hospital.viewCount,
        likeCount: hospital._count.HospitalLike,
        likedUserIds, // 좋아요를 한 사용자 ID들
        isLiked: false, // 기본값으로 false 설정 (클라이언트에서 처리)
        approvalStatusType: hospital.approvalStatusType,
        ranking: hospital.ranking,
        createdAt: hospital.createdAt,
        updatedAt: hospital.updatedAt,
        mainImageUrl: extractMainImageUrl(hospital.HospitalImage),
        medicalSpecialties:
          hospital.HospitalMedicalSpecialty?.map((hms) => ({
            id: hms.MedicalSpecialty.id,
            name: hms.MedicalSpecialty.name,
            specialtyType: hms.MedicalSpecialty.specialtyType,
          })) || [],
        displayLocationName: hospital.displayLocationName,
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
      };
    });

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    return {
      hospitals: transformedHospitals,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage,
    };
  } catch (error) {
    throw handleDatabaseError(error, 'getHospitals');
  }
}

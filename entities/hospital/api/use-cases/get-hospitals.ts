import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError, extractLocalizedText } from 'shared/lib';
import {
  type Hospital,
  type GetHospitalsRequest,
  type GetHospitalsResponse,
} from '../entities/types';

// Prisma 타입 정의
type HospitalWithRelations = Prisma.HospitalGetPayload<{
  include: {
    HospitalImage: true;
    HospitalMedicalSpecialty: {
      include: {
        MedicalSpecialty: true;
      };
    };
  };
}>;

type HospitalImageData = {
  imageType: string;
  isActive: boolean;
  imageUrl: string;
};

// 썸네일 이미지 URL 추출 헬퍼 함수
function extractThumbnailImageUrl(hospitalImages?: HospitalImageData[]): string | null {
  if (!hospitalImages || hospitalImages.length === 0) return null;

  const thumbnailImage = hospitalImages.find(
    (img) => img.imageType === 'THUMBNAIL' && img.isActive && img.imageUrl,
  );

  return thumbnailImage?.imageUrl || null;
}

export async function getHospitals(
  request: GetHospitalsRequest = {},
): Promise<GetHospitalsResponse> {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'rating',
      sortOrder = 'desc',
      specialtyType,
      minRating = 0,
    } = request;

    const offset = (page - 1) * limit;

    // 정렬 조건 설정
    const orderBy: Prisma.HospitalOrderByWithRelationInput[] = [];
    if (sortBy === 'rating') {
      orderBy.push({ rating: sortOrder });
      orderBy.push({ reviewCount: 'desc' }); // 동일 평점일 때 리뷰 수로 정렬
    } else if (sortBy === 'reviewCount') {
      orderBy.push({ reviewCount: sortOrder });
      orderBy.push({ rating: 'desc' }); // 동일 리뷰 수일 때 평점으로 정렬
    } else {
      orderBy.push({ createdAt: sortOrder });
    }

    // 필터 조건 설정
    const where: Prisma.HospitalWhereInput = {
      approvalStatusType: 'APPROVED',
      rating: {
        gte: minRating,
      },
      // 진료 부위 필터링
      ...(specialtyType && {
        HospitalMedicalSpecialty: {
          some: {
            MedicalSpecialty: {
              specialtyType: specialtyType,
              isActive: true,
            },
          },
        },
      }),
    };

    // 총 개수 조회
    const totalCount = await prisma.hospital.count({ where });

    // 병원 데이터 조회
    const hospitals: HospitalWithRelations[] = await prisma.hospital.findMany({
      where,
      include: {
        HospitalImage: {
          where: {
            imageType: 'THUMBNAIL',
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
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    // 데이터 변환
    const transformedHospitals: Hospital[] = hospitals.map((hospital) => ({
      id: hospital.id,
      name: hospital.name,
      address: hospital.address,
      rating: hospital.rating,
      reviewCount: hospital.reviewCount,
      bookmarkCount: hospital.bookmarkCount,
      viewCount: hospital.viewCount,
      approvalStatusType: hospital.approvalStatusType,
      ranking: hospital.ranking,
      createdAt: hospital.createdAt,
      updatedAt: hospital.updatedAt,
      mainImageUrl: extractThumbnailImageUrl(hospital.HospitalImage),
      medicalSpecialties:
        hospital.HospitalMedicalSpecialty?.map((hms) => ({
          id: hms.MedicalSpecialty.id,
          name: hms.MedicalSpecialty.name,
          specialtyType: hms.MedicalSpecialty.specialtyType,
        })) || [],
    }));

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

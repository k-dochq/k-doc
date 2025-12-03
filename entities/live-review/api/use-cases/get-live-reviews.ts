import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

export interface GetLiveReviewsOptions {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
  page?: number;
}

export interface LiveReviewData {
  id: string;
  content: Prisma.JsonValue;
  hospitalId: string;
  medicalSpecialtyId: string;
  detailLink: string | null;
  order: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  Hospital: {
    id: string;
    name: Prisma.JsonValue;
    address: Prisma.JsonValue;
    displayLocationName: Prisma.JsonValue | null;
  };
  MedicalSpecialty: {
    id: string;
    name: Prisma.JsonValue;
    specialtyType: MedicalSpecialtyType;
  };
  LiveReviewImage: Array<{
    id: string;
    imageUrl: string;
    alt: string | null;
    order: number | null;
  }>;
}

export interface GetLiveReviewsResponse {
  liveReviews: LiveReviewData[];
  page: number;
  limit: number;
}

export async function getLiveReviews(
  options: GetLiveReviewsOptions = {},
): Promise<GetLiveReviewsResponse> {
  try {
    const { category = 'ALL', limit = 3, page = 1 } = options;
    const skip = (page - 1) * limit;

    // 카테고리 필터링 조건
    const whereCondition: {
      isActive: boolean;
      MedicalSpecialty?: { specialtyType: MedicalSpecialtyType };
    } = {
      isActive: true,
    };

    if (category !== 'ALL') {
      whereCondition.MedicalSpecialty = {
        specialtyType: category,
      };
    }

    const liveReviews = await prisma.liveReview.findMany({
      where: whereCondition,
      include: {
        Hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            displayLocationName: true,
          },
        },
        MedicalSpecialty: {
          select: {
            id: true,
            name: true,
            specialtyType: true,
          },
        },
        LiveReviewImage: {
          where: {
            isActive: true,
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          select: {
            id: true,
            imageUrl: true,
            alt: true,
            order: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' }, // order가 null이 아닌 경우 먼저 정렬
        { createdAt: 'desc' }, // order가 null인 경우 createdAt 내림차순
      ],
      skip,
      take: limit,
    });

    return {
      liveReviews,
      page,
      limit,
    };
  } catch (error) {
    throw handleDatabaseError(error, 'getLiveReviews');
  }
}

import { Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { type GetAllReviewsParams } from '../../model/types';

/**
 * 전체 리뷰 목록 조회용 where 조건 빌더
 */
export function buildReviewWhereCondition(
  params: Pick<
    GetAllReviewsParams,
    'hospitalId' | 'category' | 'likedOnly' | 'userId' | 'hasBothImages'
  >,
): Prisma.ReviewWhereInput {
  const { hospitalId, category, likedOnly, userId, hasBothImages } = params;

  const where: Prisma.ReviewWhereInput = {
    isActive: { not: false },
  };

  if (hospitalId) {
    where.hospitalId = hospitalId;
  }

  if (category && category !== 'ALL') {
    where.MedicalSpecialty = {
      specialtyType: category as MedicalSpecialtyType,
      isActive: true,
    };
  }

  if (likedOnly && userId) {
    where.ReviewLike = {
      some: { userId },
    };
  }

  if (userId && !likedOnly) {
    where.userId = userId;
  }

  if (hasBothImages) {
    where.AND = [
      {
        ReviewImage: {
          some: { imageType: 'BEFORE', isActive: true },
        },
      },
      {
        ReviewImage: {
          some: { imageType: 'AFTER', isActive: true },
        },
      },
    ];
  }

  return where;
}

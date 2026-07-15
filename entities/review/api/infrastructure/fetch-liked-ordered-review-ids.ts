import { prisma } from 'shared/lib/prisma';
import { Prisma, type MedicalSpecialtyType } from '@prisma/client';

interface FetchLikedOrderedReviewIdsParams {
  userId: string;
  limit: number;
  offset: number;
  category?: MedicalSpecialtyType | 'ALL';
  hospitalId?: string;
}

/**
 * 사용자가 좋아요(찜)한 리뷰 ID 목록을 "최근에 찜한 순(ReviewLike.createdAt desc)"으로 조회한다.
 * 병원/의사 찜 목록과 동일하게, 찜을 누른 시점을 기준으로 정렬한다.
 */
export async function fetchLikedOrderedReviewIds({
  userId,
  limit,
  offset,
  category,
  hospitalId,
}: FetchLikedOrderedReviewIdsParams): Promise<string[]> {
  const reviewFilter: Prisma.ReviewWhereInput = {
    isActive: { not: false },
  };

  if (hospitalId) {
    reviewFilter.hospitalId = hospitalId;
  }

  if (category && category !== 'ALL') {
    reviewFilter.OR = [
      {
        MedicalSpecialty: {
          specialtyType: category,
          isActive: true,
        },
      },
      {
        ReviewMedicalSpecialty: {
          some: {
            MedicalSpecialty: {
              specialtyType: category,
              isActive: true,
            },
          },
        },
      },
    ];
  }

  const likedReviews = await prisma.reviewLike.findMany({
    where: {
      userId,
      Review: reviewFilter,
    },
    select: { reviewId: true },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  });

  return likedReviews.map((like) => like.reviewId);
}

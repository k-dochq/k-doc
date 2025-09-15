import 'server-only';

import { prisma } from 'shared/lib/prisma';
import type { ReviewCardData } from 'entities/review/model/types';
import type { Prisma } from '@prisma/client';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types';

interface GetLikedReviewsParams {
  userId: string;
  cursor?: string;
  limit: number;
}

interface GetLikedReviewsResponse {
  reviews: ReviewCardData[];
  nextCursor?: string;
  hasMore: boolean;
}

/**
 * 좋아요한 리뷰 데이터 액세스 계층
 */
export class LikedReviewsRepository {
  /**
   * 사용자가 좋아요한 리뷰 목록 조회
   */
  async getLikedReviews({
    userId,
    cursor,
    limit,
  }: GetLikedReviewsParams): Promise<GetLikedReviewsResponse> {
    // 커서 기반 페이지네이션을 위한 where 조건
    const whereCondition: Prisma.ReviewLikeWhereInput = {
      userId,
      ...(cursor && {
        createdAt: {
          lt: new Date(cursor),
        },
      }),
    };

    // 좋아요한 리뷰 조회 (limit + 1로 hasMore 판단)
    const likedReviews = await prisma.reviewLike.findMany({
      where: whereCondition,
      include: {
        Review: {
          include: {
            User: {
              select: {
                displayName: true,
                nickName: true,
                name: true,
              },
            },
            Hospital: {
              select: {
                id: true,
                name: true,
                address: true,
                prices: true,
                rating: true,
                discountRate: true,
                District: {
                  select: {
                    name: true,
                  },
                },
                HospitalImage: {
                  where: {
                    imageType: 'THUMBNAIL',
                  },
                  orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
                  take: 1,
                  select: {
                    imageUrl: true,
                  },
                },
                _count: {
                  select: {
                    Review: true,
                  },
                },
              },
            },
            MedicalSpecialty: {
              select: {
                name: true,
                specialtyType: true,
              },
            },
            ReviewImage: {
              select: {
                id: true,
                imageUrl: true,
                imageType: true,
                alt: true,
                order: true,
              },
              where: {
                isActive: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
            ReviewLike: {
              select: {
                userId: true,
              },
            },
            _count: {
              select: {
                ReviewLike: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1, // hasMore 판단을 위해 +1
    });

    // hasMore 판단 및 실제 반환할 데이터 추출
    const hasMore = likedReviews.length > limit;
    const reviews = hasMore ? likedReviews.slice(0, -1) : likedReviews;

    // ReviewCardData 형태로 변환
    const transformedReviews: ReviewCardData[] = reviews.map((likedReview) => {
      const review = likedReview.Review;

      // 이미지를 Before/After로 분류
      const beforeImages = review.ReviewImage.filter((img) => img.imageType === 'BEFORE');
      const afterImages = review.ReviewImage.filter((img) => img.imageType === 'AFTER');

      // 좋아요한 사용자 ID들
      const likedUserIds = review.ReviewLike.map((like) => like.userId);

      return {
        id: review.id,
        rating: review.rating,
        title: review.title ? parseLocalizedText(review.title) : null,
        content: review.content ? parseLocalizedText(review.content) : null,
        isRecommended: review.isRecommended,
        viewCount: review.viewCount,
        likeCount: review._count.ReviewLike, // 실시간 좋아요 수 계산
        likedUserIds, // 좋아요를 한 사용자 ID들
        isLiked: true, // 좋아요한 리뷰 리스트이므로 항상 true
        createdAt: review.createdAt,
        concerns: review.concerns,
        user: {
          displayName: review.User.displayName,
          nickName: review.User.nickName,
          name: review.User.name,
        },
        hospital: {
          id: review.Hospital.id,
          name: parseLocalizedText(review.Hospital.name),
          address: parseLocalizedText(review.Hospital.address),
          prices: parsePriceInfo(review.Hospital.prices),
          rating: review.Hospital.rating,
          reviewCount: review.Hospital._count.Review,
          thumbnailImageUrl: review.Hospital.HospitalImage[0]?.imageUrl || null,
          discountRate: review.Hospital.discountRate,
          district: {
            name: review.Hospital.District?.name
              ? parseLocalizedText(review.Hospital.District.name)
              : { ko_KR: '', en_US: '', th_TH: '' },
          },
        },
        medicalSpecialty: {
          name: parseLocalizedText(review.MedicalSpecialty.name),
          specialtyType: review.MedicalSpecialty.specialtyType,
        },
        images: {
          before: beforeImages,
          after: afterImages,
        },
      };
    });

    // 다음 커서 설정
    const nextCursor = hasMore ? reviews[reviews.length - 1].createdAt.toISOString() : undefined;

    return {
      reviews: transformedReviews,
      nextCursor,
      hasMore,
    };
  }
}

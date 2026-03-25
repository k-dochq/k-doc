import type { Prisma } from '@prisma/client';
import { type ReviewSortOption } from 'shared/model/types/review-query';

type ReviewOrderBy = Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];

/**
 * 전체 리뷰 목록 조회용 orderBy 조건 빌더
 * seed가 있으면 undefined 반환 (별도 raw query에서 처리)
 */
export function buildReviewOrderBy(
  sort: ReviewSortOption,
  seed?: string,
): ReviewOrderBy | undefined {
  if (sort === 'recommended' && seed) {
    return undefined;
  }

  const imageFirst = { ReviewImage: { _count: 'desc' as const } };

  switch (sort) {
    case 'popular':
      return [imageFirst, { viewCount: 'desc' as const }, { likeCount: 'desc' as const }];
    case 'recommended':
      return [
        imageFirst,
        { rating: 'desc' as const },
        { likeCount: 'desc' as const },
        { createdAt: 'desc' as const },
      ];
    case 'latest':
      return [imageFirst, { createdAt: 'desc' as const }];
    case 'rating_high':
      return [imageFirst, { rating: 'desc' as const }];
    case 'rating_low':
      return [imageFirst, { rating: 'asc' as const }];
    default:
      return [
        imageFirst,
        { viewCount: 'desc' as const },
        { likeCount: 'desc' as const },
        { createdAt: 'desc' as const },
      ];
  }
}

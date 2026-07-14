import { prisma } from 'shared/lib/prisma';
import {
  type GetAllReviewsParams,
  type GetAllReviewsResponse,
} from '../../model/types';
import { buildReviewWhereCondition } from '../infrastructure/build-review-where-condition';
import { buildReviewOrderBy } from '../infrastructure/build-review-order-by';
import { fetchRandomOrderedReviewIds } from '../infrastructure/fetch-random-ordered-review-ids';
import { REVIEW_LIST_INCLUDE } from '../infrastructure/review-list-include';
import { transformReviewToCardData } from '../infrastructure/services/review-transform-service';

export async function getAllReviews({
  page = 1,
  limit = 10,
  category,
  sort = 'popular',
  seed,
  offset,
  hospitalId,
  likedOnly = false,
  userId,
  hasBothImages = false,
}: GetAllReviewsParams): Promise<GetAllReviewsResponse> {
  const calculatedOffset = offset !== undefined ? offset : (page - 1) * limit;

  try {
    const whereCondition = buildReviewWhereCondition({
      hospitalId,
      category,
      likedOnly,
      userId,
      hasBothImages,
    });

    // likedOnly인 경우 좋아요 필터(whereCondition)를 반드시 적용해야 하므로,
    // 전체 리뷰 대상 랜덤 정렬(seed 기반) 경로는 사용하지 않는다.
    const effectiveSeed = likedOnly ? undefined : seed;

    const orderBy = buildReviewOrderBy(sort, effectiveSeed);

    const totalCount = await prisma.review.count({
      where: whereCondition,
    });

    let reviewIds: string[] | undefined;
    if (sort === 'popular' && effectiveSeed) {
      reviewIds = await fetchRandomOrderedReviewIds({
        seed: effectiveSeed,
        limit,
        offset: calculatedOffset,
        category,
        hospitalId,
      });
    }

    const reviews = await prisma.review.findMany({
      where: reviewIds
        ? { id: { in: reviewIds } }
        : whereCondition,
      include: REVIEW_LIST_INCLUDE,
      orderBy: reviewIds ? undefined : orderBy ?? undefined,
      take: reviewIds ? undefined : limit,
      skip: reviewIds ? undefined : calculatedOffset,
    });

    const sortedReviews = reviewIds
      ? reviewIds
          .map((id) => reviews.find((r) => r.id === id))
          .filter((r): r is NonNullable<typeof r> => r !== undefined)
      : reviews;

    const reviewCardData = await Promise.all(
      sortedReviews.map((review) => transformReviewToCardData(review)),
    );

    const hasNextPage = calculatedOffset + limit < totalCount;

    return {
      reviews: reviewCardData,
      totalCount,
      currentPage: page,
      hasNextPage,
      hasMore: hasNextPage,
    };
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw new Error('전체 리뷰 목록을 불러오는 중 오류가 발생했습니다.');
  }
}

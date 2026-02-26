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
  sort = 'recommended',
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

    const orderBy = buildReviewOrderBy(sort, seed);

    const totalCount = await prisma.review.count({
      where: whereCondition,
    });

    let reviewIds: string[] | undefined;
    if (sort === 'recommended' && seed) {
      reviewIds = await fetchRandomOrderedReviewIds({
        seed,
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

import { prisma } from 'shared/lib/prisma';
import { type MedicalSpecialtyType } from '@prisma/client';
import { searchReviewIds } from 'shared/lib/meilisearch';
import { REVIEW_LIST_INCLUDE } from '../infrastructure/review-list-include';
import { transformReviewToCardData } from '../infrastructure/services/review-transform-service';
import { type GetAllReviewsResponse } from '../../model/types';
import {
  type ReviewSortOption,
  REVIEW_SORT_OPTIONS,
  SORT_OPTION_TO_DB_FIELD_MAP,
} from 'shared/model/types/review-query';

interface GetReviewsBySearchParams {
  query: string;
  page?: number;
  limit?: number;
  categories?: MedicalSpecialtyType[];
  sort?: ReviewSortOption;
}

export async function getReviewsBySearch({
  query,
  page = 1,
  limit = 10,
  categories,
  sort = REVIEW_SORT_OPTIONS.POPULAR,
}: GetReviewsBySearchParams): Promise<GetAllReviewsResponse> {
  const offset = (page - 1) * limit;

  const meilisearchIds = await searchReviewIds(query);

  if (meilisearchIds.length === 0) {
    return { reviews: [], totalCount: 0, currentPage: page, hasNextPage: false, hasMore: false };
  }

  const where = {
    id: { in: meilisearchIds },
    isActive: true,
    ...(categories && categories.length > 0
      ? { MedicalSpecialty: { specialtyType: { in: categories } } }
      : {}),
  };

  const dbField = SORT_OPTION_TO_DB_FIELD_MAP[sort];
  const sortOrder = sort === REVIEW_SORT_OPTIONS.RATING_LOW ? 'asc' : 'desc';

  const totalCount = await prisma.review.count({ where });

  const reviews = await prisma.review.findMany({
    where,
    include: REVIEW_LIST_INCLUDE,
    orderBy: { [dbField]: sortOrder },
    skip: offset,
    take: limit,
  });

  const reviewCardData = await Promise.all(reviews.map((r) => transformReviewToCardData(r)));

  const hasNextPage = offset + limit < totalCount;

  return {
    reviews: reviewCardData,
    totalCount,
    currentPage: page,
    hasNextPage,
    hasMore: hasNextPage,
  };
}

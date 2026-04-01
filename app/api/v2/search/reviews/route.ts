import { NextRequest, NextResponse } from 'next/server';
import { type MedicalSpecialtyType } from '@prisma/client';
import { getReviewsBySearch } from 'entities/review/api/use-cases/get-reviews-by-search';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)));
  const categoriesParam = searchParams.get('categories');
  const categories = categoriesParam
    ? (categoriesParam.split(',').filter(Boolean) as MedicalSpecialtyType[])
    : undefined;
  const sortParam = searchParams.get('sort') as ReviewSortOption | null;
  const sort =
    sortParam &&
    Object.values(REVIEW_SORT_OPTIONS).includes(sortParam)
      ? sortParam
      : REVIEW_SORT_OPTIONS.POPULAR;

  if (!q) {
    return NextResponse.json({
      success: true,
      data: { reviews: [], totalCount: 0, currentPage: 1, hasNextPage: false, hasMore: false },
    });
  }

  try {
    const data = await getReviewsBySearch({ query: q, page, limit, categories, sort });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[v2/search/reviews] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to search reviews' }, { status: 500 });
  }
}

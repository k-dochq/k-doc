import { NextRequest, NextResponse } from 'next/server';
import { getReviewsBySearch } from 'entities/review/api/use-cases/get-reviews-by-search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)));

  if (!q) {
    return NextResponse.json({
      success: true,
      data: { reviews: [], totalCount: 0, currentPage: 1, hasNextPage: false, hasMore: false },
    });
  }

  try {
    const data = await getReviewsBySearch({ query: q, page, limit });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[v2/search/reviews] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to search reviews' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews } from 'entities/review';
import { type MedicalSpecialtyType } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(`[${new Date().toISOString()}] API 호출: /api/reviews${queryString}`);

    const { searchParams } = url;

    // 쿼리 파라미터 추출
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categoryParam = searchParams.get('category') || 'ALL';
    const category: MedicalSpecialtyType | undefined =
      categoryParam === 'ALL' ? undefined : (categoryParam as MedicalSpecialtyType);
    const sortBy = (searchParams.get('sortBy') as 'latest' | 'popular') || 'latest';

    // 파라미터 유효성 검사
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid pagination parameters',
        },
        { status: 400 },
      );
    }

    // 정렬 옵션 유효성 검사
    if (!['latest', 'popular'].includes(sortBy)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid sort option. Use "latest" or "popular"',
        },
        { status: 400 },
      );
    }

    // 리뷰 데이터 조회
    const reviewsData = await getAllReviews({
      page,
      limit,
      category,
      sortBy,
    });

    const response = NextResponse.json({
      success: true,
      data: reviewsData,
    });

    return response;
  } catch (error) {
    console.error('Error in /api/reviews:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
}

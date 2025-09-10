import { NextRequest, NextResponse } from 'next/server';
import { getHospitalReviews } from 'entities/review';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: hospitalId } = await params;
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(
      `[${new Date().toISOString()}] API 호출: /api/hospitals/${hospitalId}/reviews${queryString}`,
    );

    const { searchParams } = url;

    // 쿼리 파라미터 추출
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // 리뷰 데이터 조회
    const reviewsData = await getHospitalReviews({
      hospitalId,
      page,
      limit,
    });

    const response = NextResponse.json({
      success: true,
      data: reviewsData,
    });

    // Vercel Edge 캐시 설정 (브라우저 캐시 제외)
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    );

    return response;
  } catch (error) {
    console.error('Error fetching hospital reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hospital reviews',
      },
      { status: 500 },
    );
  }
}

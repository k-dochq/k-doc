import { NextRequest, NextResponse } from 'next/server';
import { getReviewDetail } from 'entities/review/api/use-cases/get-review-detail';
import { routeErrorLogger } from 'shared/lib';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 리뷰 상세 정보 조회 API Route Handler
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id: reviewId } = await params;
  const endpoint = `/api/reviews/${reviewId}`;
  const method = 'GET';

  try {
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(`[${new Date().toISOString()}] API 호출: ${endpoint}${queryString}`);

    // 리뷰 상세 정보 조회
    const reviewData = await getReviewDetail({ reviewId });

    return NextResponse.json({
      success: true,
      data: reviewData,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    if ((error as Error).message.includes('리뷰를 찾을 수 없습니다')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
          requestId,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch review detail',
        requestId,
      },
      { status: 500 },
    );
  }
}

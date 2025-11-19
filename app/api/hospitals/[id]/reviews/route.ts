import { NextRequest, NextResponse } from 'next/server';
import { getHospitalReviews, ReviewImageBlurService } from 'entities/review';
import { AuthService } from 'shared/lib/auth/server';

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
    const excludeReviewId = searchParams.get('excludeReviewId') || undefined;

    // 리뷰 데이터 조회
    let reviewsData = await getHospitalReviews({
      hospitalId,
      page,
      limit,
      excludeReviewId,
    });

    // 로그인 상태 확인 (이미지 블러 처리용)
    const authService = new AuthService();
    const currentUser = await authService.getCurrentUserOrNull();

    // 로그인이 안되어 있으면 이미지 URL을 blur 이미지로 교체
    if (!currentUser) {
      const blurService = new ReviewImageBlurService();
      reviewsData = {
        ...reviewsData,
        reviews: blurService.replaceReviewImagesWithBlur(reviewsData.reviews),
      };
    }

    const response = NextResponse.json({
      success: true,
      data: reviewsData,
    });

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

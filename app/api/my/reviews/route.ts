import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, ReviewImageBlurService } from 'entities/review';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';

const ENDPOINT = '/api/my/reviews';
const METHOD = 'GET';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    // AuthService 인스턴스 생성
    const authService = new AuthService();

    // 사용자 인증 확인 (필수)
    const user = await authService.getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    // 페이지네이션 파라미터 파싱
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10', 10)));

    // 내가 작성한 리뷰만 조회 (userId로 필터링, likedOnly는 false)
    const reviewsData = await getAllReviews({
      page,
      limit,
      userId: user.id,
      likedOnly: false,
      sort: 'latest', // 최신순 정렬
    });

    // 이미지 블러 처리 (이미 로그인되어 있으므로 블러 처리 불필요하지만 일관성을 위해 유지)
    const currentUser = await authService.getCurrentUserOrNull();
    let finalReviewsData = reviewsData;

    if (!currentUser) {
      const blurService = new ReviewImageBlurService();
      finalReviewsData = {
        ...reviewsData,
        reviews: blurService.replaceReviewImagesWithBlur(reviewsData.reviews),
      };
    }

    return NextResponse.json(
      {
        success: true,
        data: finalReviewsData,
      },
      { status: 200 },
    );
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint: ENDPOINT,
      method: METHOD,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch my reviews',
        requestId,
      },
      { status: 500 },
    );
  }
}

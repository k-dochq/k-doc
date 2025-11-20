import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, ReviewImageBlurService } from 'entities/review';
import {
  convertToDbReviewQueryParams,
  validateReviewQueryParams,
} from 'shared/lib/review-query-utils';
import { AuthService } from 'shared/lib/auth/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryString = url.search;

    // 캐시 확인용 로그 (쿼리 파라미터 포함)
    console.log(`[${new Date().toISOString()}] API 호출: /api/reviews${queryString}`);

    const { searchParams } = url;

    // 타입 안전한 쿼리 파라미터 유효성 검증
    const validationResult = validateReviewQueryParams(searchParams);

    if (!validationResult.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: validationResult.errors,
        },
        { status: 400 },
      );
    }

    // 타입 안전한 파라미터 파싱 및 변환
    const parsedParams = validationResult.params!;

    // AuthService 인스턴스 생성 (한 번만 생성)
    const authService = new AuthService();

    // likedOnly가 true인 경우 사용자 인증 확인
    let userId: string | undefined;
    if (parsedParams.likedOnly) {
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
      userId = user.id;
    }

    const dbParams = convertToDbReviewQueryParams(parsedParams, userId);

    // 리뷰 데이터 조회
    let reviewsData = await getAllReviews(dbParams);

    // 로그인 상태 확인 (이미지 블러 처리용)
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
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch reviews',
      },
      { status: 500 },
    );
  }
}

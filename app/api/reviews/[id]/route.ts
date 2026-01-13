import { NextRequest, NextResponse } from 'next/server';
import { getReviewDetail } from 'entities/review/api/use-cases/get-review-detail';
import { ReviewImageBlurService } from 'entities/review';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';
import { prisma } from 'shared/lib/prisma';
import { ReviewRepository } from 'entities/review/api/infrastructure/repositories/review-repository';
import { DeleteReview } from 'entities/review/api/use-cases/delete-review';

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
    let reviewData = await getReviewDetail({ reviewId });

    // 로그인 상태 확인 (이미지 블러 처리용)
    const authService = new AuthService();
    const currentUser = await authService.getCurrentUserOrNull();

    // 로그인이 안되어 있으면 이미지 URL을 blur 이미지로 교체
    if (!currentUser) {
      const blurService = new ReviewImageBlurService();
      reviewData = {
        ...reviewData,
        review: blurService.replaceReviewImagesWithBlur([reviewData.review])[0],
      };
    }

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

/**
 * 리뷰 삭제 API Route Handler
 * 작성자 본인만 삭제 가능
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const endpoint = '/api/reviews/[id]';
  const method = 'DELETE';

  try {
    const { id: reviewId } = await params;

    // 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // 리뷰 존재 여부 및 작성자 확인
    // findFirst를 사용하여 isActive 조건 포함
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        // isActive가 false인 리뷰는 제외 (null과 true는 포함)
        isActive: { not: false },
      },
      select: { userId: true, hospitalId: true },
    });

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
        },
        { status: 404 },
      );
    }

    // 작성자 확인 (이중 확인)
    if (review.userId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: You can only delete your own reviews',
        },
        { status: 403 },
      );
    }

    // UseCase 실행
    const reviewRepository = new ReviewRepository();
    const deleteReviewUseCase = new DeleteReview(reviewRepository);

    const result = await deleteReviewUseCase.execute(reviewId);

    return NextResponse.json(
      {
        success: true,
        reviewId: result.reviewId,
        hospitalId: result.hospitalId,
      },
      { status: 200 },
    );
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    // 인증 에러
    if (error instanceof Error && error.message.includes('not authenticated')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          requestId,
        },
        { status: 401 },
      );
    }

    // 리뷰 없음 에러
    if (error instanceof Error && error.message.includes('Review not found')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Review not found',
          requestId,
        },
        { status: 404 },
      );
    }

    // 검증 에러
    if (error instanceof Error && error.message.includes('required')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          requestId,
        },
        { status: 400 },
      );
    }

    // 일반 에러
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete review',
        requestId,
      },
      { status: 500 },
    );
  }
}

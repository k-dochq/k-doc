import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { ReviewLikeRepository } from 'features/review-like/api/infrastructure/repositories/review-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import { GetReviewLikeStatusUseCase } from 'features/review-like/api/use-cases/get-review-like-status';
import { ToggleReviewLikeUseCase } from 'features/review-like/api/use-cases/toggle-review-like';
import type {
  ReviewLikeResult,
  ReviewLikeStatusResult,
} from 'features/review-like/api/entities/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface ReviewLikeStatusResponse {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
  requestId?: string;
}

interface ReviewLikeToggleResponse {
  success: boolean;
  isLiked: boolean;
  likeCount: number;
  error?: string;
  requestId?: string;
}

/**
 * 리뷰 좋아요 상태 조회 Route Handler
 */
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/reviews/[id]/like';
  const method = 'GET';

  try {
    const { id: reviewId } = await params;

    // 의존성 주입을 통한 인스턴스 생성
    const reviewLikeRepository = new ReviewLikeRepository();
    const authService = new AuthService();
    const getReviewLikeStatusUseCase = new GetReviewLikeStatusUseCase(
      reviewLikeRepository,
      authService,
    );

    // 사용자 인증 확인
    const currentUser = await authService.getCurrentUser();
    if (!currentUser) {
      const authFailedError = new Error('User authentication failed');
      const requestId = routeErrorLogger.logError({
        error: authFailedError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: 'Unauthorized',
          requestId,
        } satisfies ReviewLikeStatusResponse,
        { status: 401 },
      );
    }

    // Use Case 실행
    const result: ReviewLikeStatusResult = await getReviewLikeStatusUseCase.execute({
      reviewId,
      userId: currentUser.id,
    });

    if (!result.success) {
      const useCaseError = new Error(`GetReviewLikeStatusUseCase failed: ${result.error}`);
      const requestId = routeErrorLogger.logError({
        error: useCaseError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: result.error || 'Failed to get review like status',
          requestId,
        } satisfies ReviewLikeStatusResponse,
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        isLiked: result.isLiked,
        likeCount: result.likeCount,
      } satisfies ReviewLikeStatusResponse,
      { status: 200 },
    );
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: 'Internal server error',
        requestId,
      } satisfies ReviewLikeStatusResponse,
      { status: 500 },
    );
  }
}

/**
 * 리뷰 좋아요 토글 Route Handler
 */
export async function POST(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/reviews/[id]/like';
  const method = 'POST';

  try {
    const { id: reviewId } = await params;

    // 의존성 주입을 통한 인스턴스 생성
    const reviewLikeRepository = new ReviewLikeRepository();
    const authService = new AuthService();
    const toggleReviewLikeUseCase = new ToggleReviewLikeUseCase(reviewLikeRepository, authService);

    // 사용자 인증 확인
    const currentUser = await authService.getCurrentUser();
    if (!currentUser) {
      const authFailedError = new Error('User authentication failed');
      const requestId = routeErrorLogger.logError({
        error: authFailedError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: 'Unauthorized',
          requestId,
        } satisfies ReviewLikeToggleResponse,
        { status: 401 },
      );
    }

    // Use Case 실행
    const result: ReviewLikeResult = await toggleReviewLikeUseCase.execute({
      reviewId,
      userId: currentUser.id,
    });

    if (!result.success) {
      const useCaseError = new Error(`ToggleReviewLikeUseCase failed: ${result.error}`);
      const requestId = routeErrorLogger.logError({
        error: useCaseError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: result.error || 'Failed to toggle review like',
          requestId,
        } satisfies ReviewLikeToggleResponse,
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        isLiked: result.isLiked,
        likeCount: result.likeCount,
      } satisfies ReviewLikeToggleResponse,
      { status: 200 },
    );
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: 'Internal server error',
        requestId,
      } satisfies ReviewLikeToggleResponse,
      { status: 500 },
    );
  }
}

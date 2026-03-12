import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { ReviewRecommendRepository } from 'features/review-recommend/api/infrastructure/repositories/review-recommend-repository';
import { AuthService } from 'shared/lib/auth/server';
import { ToggleReviewRecommendUseCase } from 'features/review-recommend/api/use-cases/toggle-review-recommend';
import type { ReviewRecommendResult } from 'features/review-recommend/api/entities/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface ReviewRecommendToggleResponse {
  success: boolean;
  isRecommended: boolean;
  error?: string;
  requestId?: string;
}

/**
 * 리뷰 추천 토글 Route Handler
 */
export async function POST(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/reviews/[id]/recommend';
  const method = 'POST';

  try {
    const { id: reviewId } = await params;

    const reviewRecommendRepository = new ReviewRecommendRepository();
    const authService = new AuthService();
    const toggleReviewRecommendUseCase = new ToggleReviewRecommendUseCase(
      reviewRecommendRepository,
      authService,
    );

    // 로그인 필수
    const currentUser = await authService.getCurrentUserOrNull();
    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          isRecommended: false,
          error: 'Login required',
        } satisfies ReviewRecommendToggleResponse,
        { status: 401 },
      );
    }

    const result: ReviewRecommendResult = await toggleReviewRecommendUseCase.execute({
      reviewId,
      userId: currentUser.id,
    });

    if (!result.success) {
      const useCaseError = new Error(`ToggleReviewRecommendUseCase failed: ${result.error}`);
      const requestId = routeErrorLogger.logError({
        error: useCaseError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          isRecommended: false,
          error: result.error || 'Failed to toggle review recommend',
          requestId,
        } satisfies ReviewRecommendToggleResponse,
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        isRecommended: result.isRecommended,
      } satisfies ReviewRecommendToggleResponse,
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
        isRecommended: false,
        error: 'Internal server error',
        requestId,
      } satisfies ReviewRecommendToggleResponse,
      { status: 500 },
    );
  }
}

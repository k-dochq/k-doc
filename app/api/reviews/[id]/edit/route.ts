import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';
import { ReviewRepository } from 'entities/review/api/infrastructure/repositories/review-repository';
import { UpdateReview } from 'entities/review/api/use-cases/update-review';
import {
  type UpdateReviewRequest,
  type UpdateReviewResponse,
} from 'entities/review/api/entities/types';
import { prisma } from 'shared/lib/prisma';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse<UpdateReviewResponse>> {
  const endpoint = '/api/reviews/[id]/edit';
  const method = 'PUT';

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
      select: { userId: true },
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

    // 작성자 확인
    if (review.userId !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: You can only edit your own reviews',
        },
        { status: 403 },
      );
    }

    // 요청 데이터 파싱
    const body = (await request.json()) as UpdateReviewRequest;

    // 필수 필드 검증
    if (!body.rating || !body.content || !body.procedureName || !body.medicalSpecialtyId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 },
      );
    }

    // UseCase 실행
    const reviewRepository = new ReviewRepository();
    const updateReviewUseCase = new UpdateReview(reviewRepository);

    const result = await updateReviewUseCase.execute(reviewId, body);

    return NextResponse.json(
      {
        success: true,
        reviewId: result.reviewId,
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

    // 검증 에러
    if (
      error instanceof Error &&
      (error.message.includes('required') ||
        error.message.includes('must be') ||
        error.message.includes('Maximum'))
    ) {
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
        error: 'Failed to update review',
        requestId,
      },
      { status: 500 },
    );
  }
}

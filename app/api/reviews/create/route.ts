import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';
import { ReviewRepository } from 'entities/review/api/infrastructure/repositories/review-repository';
import { CreateReview } from 'entities/review/api/use-cases/create-review';
import {
  type CreateReviewRequest,
  type CreateReviewResponse,
} from 'entities/review/api/entities/types';

export async function POST(request: NextRequest): Promise<NextResponse<CreateReviewResponse>> {
  const endpoint = '/api/reviews/create';
  const method = 'POST';

  try {
    // 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // 요청 데이터 파싱
    const body = (await request.json()) as Omit<CreateReviewRequest, 'userId'>;

    // 필수 필드 검증
    if (
      !body.rating ||
      !body.content ||
      !body.procedureName ||
      !body.medicalSpecialtyId ||
      !body.hospitalId
    ) {
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
    const createReviewUseCase = new CreateReview(reviewRepository);

    const requestData: CreateReviewRequest = {
      ...body,
      userId: user.id,
    };

    const result = await createReviewUseCase.execute(requestData);

    return NextResponse.json(
      {
        success: true,
        reviewId: result.reviewId,
      },
      { status: 201 },
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
        error: 'Failed to create review',
        requestId,
      },
      { status: 500 },
    );
  }
}

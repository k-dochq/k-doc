import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { HospitalLikeRepository } from 'features/hospital-like/api/infrastructure/repositories/hospital-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import { GetHospitalLikeStatusUseCase } from 'features/hospital-like/api/use-cases/get-hospital-like-status';
import { ToggleHospitalLikeUseCase } from 'features/hospital-like/api/use-cases/toggle-hospital-like';
import type {
  GetHospitalLikeStatusResponse,
  HospitalLikeToggleResponse,
} from 'entities/hospital-like';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * 병원 좋아요 상태 조회 Route Handler
 */
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/hospitals/[id]/like';
  const method = 'GET';

  try {
    const { id: hospitalId } = await params;

    // 의존성 주입을 통한 인스턴스 생성
    const hospitalLikeRepository = new HospitalLikeRepository();
    const authService = new AuthService();
    const getHospitalLikeStatusUseCase = new GetHospitalLikeStatusUseCase(
      hospitalLikeRepository,
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
          error: 'Unauthorized',
          requestId,
        },
        { status: 401 },
      );
    }

    // Use Case 실행
    const result = await getHospitalLikeStatusUseCase.execute({
      hospitalId,
      userId: currentUser.id,
    });

    if (!result.success) {
      if (result.error === 'Hospital not found') {
        const hospitalNotFoundError = new Error(`Hospital not found: ${hospitalId}`);
        const requestId = routeErrorLogger.logError({
          error: hospitalNotFoundError,
          endpoint,
          method,
          request,
        });

        return NextResponse.json(
          {
            success: false,
            error: 'Hospital not found',
            requestId,
          },
          { status: 404 },
        );
      }

      const useCaseError = new Error(result.error || 'Unknown error');
      const requestId = routeErrorLogger.logError({
        error: useCaseError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Internal server error',
          requestId,
        },
        { status: 500 },
      );
    }

    const response: GetHospitalLikeStatusResponse = {
      isLiked: result.isLiked,
      likeCount: result.likeCount,
    };

    return NextResponse.json({ success: true, data: response });
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
        error: 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}

/**
 * 병원 좋아요 토글 Route Handler
 */
export async function POST(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/hospitals/[id]/like';
  const method = 'POST';

  try {
    const { id: hospitalId } = await params;

    // 의존성 주입을 통한 인스턴스 생성
    const hospitalLikeRepository = new HospitalLikeRepository();
    const authService = new AuthService();
    const toggleHospitalLikeUseCase = new ToggleHospitalLikeUseCase(
      hospitalLikeRepository,
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
          error: 'Unauthorized',
          requestId,
        },
        { status: 401 },
      );
    }

    // Use Case 실행
    const result = await toggleHospitalLikeUseCase.execute({
      hospitalId,
      userId: currentUser.id,
    });

    if (!result.success) {
      if (result.error === 'Hospital not found') {
        const hospitalNotFoundError = new Error(`Hospital not found: ${hospitalId}`);
        const requestId = routeErrorLogger.logError({
          error: hospitalNotFoundError,
          endpoint,
          method,
          request,
        });

        return NextResponse.json(
          {
            success: false,
            error: 'Hospital not found',
            requestId,
          },
          { status: 404 },
        );
      }

      const useCaseError = new Error(result.error || 'Unknown error');
      const requestId = routeErrorLogger.logError({
        error: useCaseError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Internal server error',
          requestId,
        },
        { status: 500 },
      );
    }

    const response: HospitalLikeToggleResponse = {
      isLiked: result.isLiked,
      likeCount: result.likeCount,
    };

    return NextResponse.json({ success: true, data: response });
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
        error: 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}

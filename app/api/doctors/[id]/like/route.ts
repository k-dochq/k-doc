import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib/error-logger';
import { AuthService } from 'shared/lib/auth/server';
import { DoctorLikeRepository } from 'features/doctor-like/api/infrastructure/repositories/doctor-like-repository';
import { GetDoctorLikeStatusUseCase } from 'features/doctor-like/api/use-cases/get-doctor-like-status';
import { ToggleDoctorLikeUseCase } from 'features/doctor-like/api/use-cases/toggle-doctor-like';
import type {
  GetDoctorLikeStatusResponse,
  DoctorLikeToggleResponse,
} from 'features/doctor-like/api/entities/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * 의사 좋아요 상태 조회 Route Handler
 */
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/doctors/[id]/like';
  const method = 'GET';

  try {
    const { id: doctorId } = await params;

    // 의존성 주입을 통한 인스턴스 생성
    const doctorLikeRepository = new DoctorLikeRepository();
    const authService = new AuthService();
    const getDoctorLikeStatusUseCase = new GetDoctorLikeStatusUseCase(
      doctorLikeRepository,
      authService,
    );

    // 사용자 인증 확인 (비로그인 사용자도 허용)
    const currentUser = await authService.getCurrentUserOrNull();

    // 비로그인 사용자의 경우 기본값 반환
    if (!currentUser) {
      // 전체 좋아요 수만 조회
      const likeCount = await doctorLikeRepository.countLikesByDoctor(doctorId);

      const response: GetDoctorLikeStatusResponse = {
        isLiked: false, // 비로그인 사용자는 좋아요 안함
        likeCount,
      };

      return NextResponse.json({ success: true, data: response });
    }

    // Use Case 실행
    const result = await getDoctorLikeStatusUseCase.execute({
      doctorId,
      userId: currentUser.id,
    });

    if (!result.success) {
      if (result.error === 'Doctor not found') {
        const doctorNotFoundError = new Error(`Doctor not found: ${doctorId}`);
        const requestId = routeErrorLogger.logError({
          error: doctorNotFoundError,
          endpoint,
          method,
          request,
        });

        return NextResponse.json(
          {
            success: false,
            error: 'Doctor not found',
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

    const response: GetDoctorLikeStatusResponse = {
      isLiked: result.isLiked,
      likeCount: result.likeCount,
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error instanceof Error ? error : new Error('Unknown error'),
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
 * 의사 좋아요 토글 Route Handler
 */
export async function POST(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const endpoint = '/api/doctors/[id]/like';
  const method = 'POST';

  try {
    const { id: doctorId } = await params;

    // 의존성 주입을 통한 인스턴스 생성
    const doctorLikeRepository = new DoctorLikeRepository();
    const authService = new AuthService();
    const toggleDoctorLikeUseCase = new ToggleDoctorLikeUseCase(doctorLikeRepository, authService);

    // 사용자 인증 확인 (좋아요 토글은 로그인 필수)
    const currentUser = await authService.getCurrentUserOrNull();
    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Login required',
        },
        { status: 401 },
      );
    }

    // Use Case 실행
    const result = await toggleDoctorLikeUseCase.execute({
      doctorId,
      userId: currentUser.id,
    });

    if (!result.success) {
      if (result.error === 'Doctor not found') {
        const doctorNotFoundError = new Error(`Doctor not found: ${doctorId}`);
        const requestId = routeErrorLogger.logError({
          error: doctorNotFoundError,
          endpoint,
          method,
          request,
        });

        return NextResponse.json(
          {
            success: false,
            error: 'Doctor not found',
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

    const response: DoctorLikeToggleResponse = {
      isLiked: result.isLiked,
      likeCount: result.likeCount,
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error instanceof Error ? error : new Error('Unknown error'),
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

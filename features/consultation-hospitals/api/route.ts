import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { AuthService } from 'shared/lib/auth/server';
import { ConsultationHospitalRepository } from './infrastructure/repositories/consultation-hospital-repository';
import { GetConsultationHospitalsUseCase } from './use-cases/get-consultation-hospitals';
import type { ConsultationHospitalsApiResponse } from './entities/types';

/**
 * 상담중인 병원 목록 조회 Route Handler
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<ConsultationHospitalsApiResponse>> {
  const endpoint = '/api/consultation-hospitals';
  const method = 'GET';

  try {
    // 의존성 주입을 통한 인스턴스 생성
    const consultationHospitalRepository = new ConsultationHospitalRepository();
    const authService = new AuthService();
    const getConsultationHospitalsUseCase = new GetConsultationHospitalsUseCase(
      consultationHospitalRepository,
      authService,
    );

    // Use Case 실행 (인증 확인 포함)
    const hospitals = await getConsultationHospitalsUseCase.execute();

    return NextResponse.json({
      success: true,
      data: hospitals,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    // 인증 에러인 경우 401 반환
    if (error instanceof Error && error.message.includes('not authenticated')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          data: [],
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        data: [],
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { routeErrorLogger } from 'shared/lib';

/**
 * 병원 상세 정보 조회 API Route Handler
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const endpoint = `/api/hospitals/${id}`;
  const method = 'GET';

  try {
    const result = await getHospitalDetail({ id });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    if ((error as Error).message.includes('Hospital not found')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Hospital not found',
          requestId,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hospital detail',
        requestId,
      },
      { status: 500 },
    );
  }
}

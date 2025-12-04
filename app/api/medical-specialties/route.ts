import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/medical-specialties';
  const method = 'GET';

  try {
    // MedicalSpecialty 테이블에서 활성화된 카테고리들을 조회
    const medicalSpecialties = await prisma.medicalSpecialty.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        specialtyType: true,
        order: true,
        isActive: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      data: medicalSpecialties,
    });
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
        error: 'Failed to fetch medical specialties',
        requestId,
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/categories';
  const method = 'GET';

  try {
    // MedicalSpecialty 테이블에서 활성화된 카테고리들을 조회
    const categories = await prisma.medicalSpecialty.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        specialtyType: true,
        name: true,
        order: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: categories,
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
        error: 'Failed to fetch categories',
        requestId,
      },
      { status: 500 },
    );
  }
}

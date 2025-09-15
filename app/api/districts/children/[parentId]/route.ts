import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

interface RouteParams {
  params: Promise<{
    parentId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { parentId } = await params;

    // 하위 지역 목록 조회 (level = 1, parentId 기준)
    const childDistricts = await prisma.district.findMany({
      where: {
        level: 1,
        parentId: parentId,
        countryCode: 'KR', // 한국 지역만
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      data: childDistricts,
    });
  } catch (error) {
    console.error('Error fetching child districts:', error);

    return NextResponse.json(
      {
        success: false,
        error: '하위 지역 목록을 불러오는 중 오류가 발생했습니다',
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

interface RouteParams {
  params: Promise<{
    parentId: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { parentId } = await params;

    // 하위 지역 목록 조회 (level = 1, parentId 기준, 활성화된 것만)
    const childDistricts = await prisma.district.findMany({
      where: {
        level: 1,
        parentId: parentId,
        countryCode: 'KR', // 한국 지역만
        OR: [
          { isActive: true },
          { isActive: null }, // 기본값 true로 간주
        ],
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    // 영어 이름 기준으로 알파벳 순서 정렬
    const sortedDistricts = childDistricts.sort((a, b) => {
      const nameA = (a.name as { en_US?: string })?.en_US || '';
      const nameB = (b.name as { en_US?: string })?.en_US || '';
      return nameA.localeCompare(nameB, 'en', { sensitivity: 'base' });
    });

    return NextResponse.json({
      success: true,
      data: sortedDistricts,
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

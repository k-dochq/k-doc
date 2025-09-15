import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { parseLocalizedText } from 'shared/model/types/common';

export async function GET(_request: NextRequest) {
  try {
    // 상위 지역 목록 조회 (level = 0)
    const parentDistricts = await prisma.district.findMany({
      where: {
        level: 0,
        countryCode: 'KR', // 한국 지역만
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    // 중복된 이름의 지역 제거 (같은 이름이 여러 개 있을 때 가장 먼저 생성된 것만 유지)
    const uniqueDistricts = parentDistricts.reduce(
      (acc, district) => {
        const districtName = parseLocalizedText(district.name).ko_KR;
        if (!acc.some((d) => parseLocalizedText(d.name).ko_KR === districtName)) {
          acc.push(district);
        }
        return acc;
      },
      [] as typeof parentDistricts,
    );

    return NextResponse.json({
      success: true,
      data: uniqueDistricts,
    });
  } catch (error) {
    console.error('Error fetching parent districts:', error);

    return NextResponse.json(
      {
        success: false,
        error: '상위 지역 목록을 불러오는 중 오류가 발생했습니다',
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { type EventBannerType } from '@prisma/client';

export const revalidate = 1200; // 20분

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const typeParam = url.searchParams.get('type');
    const type = typeParam ? (typeParam as EventBannerType) : undefined;
    const isActiveParam = url.searchParams.get('isActive');
    // isActive 미지정 시 기본값: 활성 배너만 반환 (공개용 일관성). ?isActive=false 로 비활성 포함 조회 가능.
    const isActive: boolean = isActiveParam?.toLowerCase() !== 'false';

    const banners = await prisma.eventBanner.findMany({
      where: {
        ...(type && { type }),
        isActive,
      },
      include: {
        EventBannerImage: true,
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error('Failed to fetch banners:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch banners',
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: errorStack }),
      },
      { status: 500 },
    );
  }
}

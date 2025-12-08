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
    const isActive =
      isActiveParam === null
        ? undefined
        : isActiveParam.toLowerCase() === 'true'
          ? true
          : isActiveParam.toLowerCase() === 'false'
            ? false
            : undefined;

    const banners = await prisma.eventBanner.findMany({
      where: {
        ...(type && { type }),
        ...(isActive !== undefined && { isActive }),
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

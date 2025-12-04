import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { type EventBannerType } from '@prisma/client';

export const revalidate = 1200; // 20분 (1200초)

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const typeParam = url.searchParams.get('type');
    const type = typeParam ? (typeParam as EventBannerType) : undefined;

    const now = new Date();
    const banners = await prisma.eventBanner.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        OR: [{ endDate: null }, { endDate: { gte: now } }],
        ...(type && { type }),
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
    console.error('Failed to fetch active banners:', error);
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

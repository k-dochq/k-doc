import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const banners = await prisma.eventBanner.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        OR: [{ endDate: null }, { endDate: { gte: now } }],
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
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch banners',
      },
      { status: 500 },
    );
  }
}

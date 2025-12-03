import { NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function GET() {
  try {
    // 활성 카테고리만 조회
    const categories = await prisma.youtubeVideoCategory.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        order: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      data: {
        categories,
      },
    });
  } catch (error) {
    console.error('Error fetching youtube video categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch youtube video categories' },
      { status: 500 },
    );
  }
}

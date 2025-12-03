import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get('categoryId') || undefined;
    const limit = parseInt(searchParams.get('limit') || '10');

    // 필터 조건 구성
    const where: {
      isActive: boolean;
      categoryId?: string;
    } = {
      isActive: true,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    // 영상 조회
    const videos = await prisma.youtubeVideo.findMany({
      where,
      select: {
        id: true,
        categoryId: true,
        title: true,
        description: true,
        videoUrl: true,
        order: true,
        thumbnails: {
          select: {
            id: true,
            locale: true,
            imageUrl: true,
            alt: true,
          },
          orderBy: { locale: 'asc' },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }, { id: 'desc' }],
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        videos,
      },
    });
  } catch (error) {
    console.error('Error fetching youtube videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch youtube videos' },
      { status: 500 },
    );
  }
}

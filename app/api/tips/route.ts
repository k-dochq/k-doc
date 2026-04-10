import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where = { status: 'PUBLISHED' as const };

    const [articles, total] = await Promise.all([
      prisma.insightArticle.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          coverImage: true,
          hashtags: true,
          medicalSpecialtyIds: true,
          viewCount: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.insightArticle.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        articles,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error('Error fetching tips:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch tips',
      },
      { status: 500 },
    );
  }
}

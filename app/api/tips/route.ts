import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'latest';

    const skip = (page - 1) * limit;

    const where = { status: 'PUBLISHED' as const };

    const orderBy = sort === 'popular' ? { viewCount: 'desc' as const } : { publishedAt: 'desc' as const };

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
        orderBy,
        skip,
        take: limit,
      }),
      prisma.insightArticle.count({ where }),
    ]);

    // medicalSpecialtyIds에서 사용된 모든 ID를 수집하여 한 번에 조회
    const allSpecialtyIds = [...new Set(articles.flatMap((a) => a.medicalSpecialtyIds))];

    const specialties =
      allSpecialtyIds.length > 0
        ? await prisma.medicalSpecialty.findMany({
            where: { id: { in: allSpecialtyIds } },
            select: { id: true, name: true },
          })
        : [];

    const specialtyMap = new Map(specialties.map((s) => [s.id, s]));

    // 각 아티클에 medicalSpecialties 배열 추가
    const articlesWithSpecialties = articles.map((article) => ({
      ...article,
      medicalSpecialties: article.medicalSpecialtyIds
        .map((id) => specialtyMap.get(id))
        .filter(Boolean),
    }));

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        articles: articlesWithSpecialties,
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

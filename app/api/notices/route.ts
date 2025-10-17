import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const isActive = searchParams.get('isActive') === 'true' || true;

    // 페이지네이션 계산
    const skip = (page - 1) * limit;

    // 공지사항 목록 조회 (첨부 파일 포함)
    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where: {
          isActive,
        },
        include: {
          NoticeFile: {
            where: {
              isActive: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'asc', // 오래된 순
        },
        skip,
        take: limit,
      }),
      prisma.notice.count({
        where: {
          isActive,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      success: true,
      data: {
        notices,
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '공지사항 목록을 불러오는데 실패했습니다.',
      },
      { status: 500 },
    );
  }
}

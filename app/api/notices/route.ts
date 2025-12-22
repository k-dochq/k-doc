import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import type { Prisma } from '@prisma/client';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const isActive = searchParams.get('isActive') === 'true' || true;
    const search = searchParams.get('search')?.trim() || undefined;
    const lang = searchParams.get('lang') || undefined;

    // 페이지네이션 계산
    const skip = (page - 1) * limit;

    // 검색 조건 구성
    const where: Prisma.NoticeWhereInput = {
      isActive,
    };

    // 검색어가 있고 언어가 지정된 경우, 해당 언어의 title과 content에서 검색
    if (search && lang) {
      // Locale을 JSON 필드 경로로 변환
      const localeKey = lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH';

      where.OR = [
        { title: { path: [localeKey], string_contains: search } },
        { content: { path: [localeKey], string_contains: search } },
      ];
    }

    // 공지사항 목록 조회 (첨부 파일 포함)
    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where,
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
          createdAt: 'desc', // 최신순
        },
        skip,
        take: limit,
      }),
      prisma.notice.count({
        where,
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

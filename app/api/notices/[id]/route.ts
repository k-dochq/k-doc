import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await params;

    // 공지사항 상세 조회 (첨부 파일 포함)
    const notice = await prisma.notice.findUnique({
      where: {
        id,
        isActive: true,
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
    });

    if (!notice) {
      return NextResponse.json(
        {
          success: false,
          error: '공지사항을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    // 이전글 조회 (createdAt이 현재보다 큰 것 중 가장 최근 것 = 목록에서 이전에 나오는 글)
    const previousNotice = await prisma.notice.findFirst({
      where: {
        isActive: true,
        createdAt: {
          gt: notice.createdAt,
        },
      },
      orderBy: {
        createdAt: 'asc', // 가장 최근 것
      },
      select: {
        id: true,
        title: true,
      },
    });

    // 다음글 조회 (createdAt이 현재보다 작은 것 중 가장 오래된 것 = 목록에서 다음에 나오는 글)
    const nextNotice = await prisma.notice.findFirst({
      where: {
        isActive: true,
        createdAt: {
          lt: notice.createdAt,
        },
      },
      orderBy: {
        createdAt: 'desc', // 가장 오래된 것
      },
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...notice,
        previousNotice: previousNotice || null,
        nextNotice: nextNotice || null,
      },
    });
  } catch (error) {
    console.error('Error fetching notice detail:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '공지사항을 불러오는데 실패했습니다.',
      },
      { status: 500 },
    );
  }
}

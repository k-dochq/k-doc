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

    return NextResponse.json({
      success: true,
      data: notice,
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

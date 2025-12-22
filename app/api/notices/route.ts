import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import type { Prisma } from '@prisma/client';

// 영어 검색어의 대소문자 변형 생성 함수
function generateSearchVariations(search: string): string[] {
  const variations = [search]; // 원본 검색어
  variations.push(search.toUpperCase()); // 전체 대문자
  variations.push(search.toLowerCase()); // 전체 소문자
  // 첫 글자 대문자 변형 (예: "notice" → "Notice")
  if (search.length > 0) {
    variations.push(search.charAt(0).toUpperCase() + search.slice(1).toLowerCase());
  }
  // 중복 제거
  return Array.from(new Set(variations));
}

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

      // 영어 검색어인지 확인
      const isEnglishSearch = lang === 'en' && /^[a-zA-Z\s]+$/.test(search);

      if (isEnglishSearch) {
        // 영어인 경우: 대소문자 변형 생성하여 각 변형에 대해 검색
        const searchVariations = generateSearchVariations(search);

        // title과 content 각각에 대해 모든 변형 검색
        const titleConditions = searchVariations.map((variation) => ({
          title: {
            path: [localeKey],
            string_contains: variation,
          },
        }));

        const contentConditions = searchVariations.map((variation) => ({
          content: {
            path: [localeKey],
            string_contains: variation,
          },
        }));

        where.OR = [...titleConditions, ...contentConditions];
      } else {
        // 한국어, 태국어는 기존 방식 사용
        where.OR = [
          { title: { path: [localeKey], string_contains: search } },
          { content: { path: [localeKey], string_contains: search } },
        ];
      }
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

import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from 'entities/comment';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 댓글 목록 조회 Route Handler
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const endpoint = '/api/reviews/[id]/comments';
  const method = 'GET';

  try {
    const { id: reviewId } = await params;
    const url = new URL(request.url);
    const queryString = url.search;

    console.log(
      `[${new Date().toISOString()}] API 호출: ${endpoint.replace('[id]', reviewId)}${queryString}`,
    );

    const { searchParams } = url;
    const cursor = searchParams.get('cursor') || undefined;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // 입력 검증
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid limit parameter (1-50)',
        },
        { status: 400 },
      );
    }

    // 댓글 목록 조회
    const commentsData = await getComments({
      reviewId,
      cursor,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: commentsData,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error instanceof Error ? error : new Error(String(error)),
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch comments',
        requestId,
      },
      { status: 500 },
    );
  }
}

/**
 * 댓글 작성 Route Handler
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  const endpoint = '/api/reviews/[id]/comments';
  const method = 'POST';

  try {
    const { id: reviewId } = await params;

    console.log(`[${new Date().toISOString()}] API 호출: ${endpoint.replace('[id]', reviewId)}`);

    // 사용자 인증 확인
    const authService = new AuthService();
    const currentUser = await authService.getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          error: '로그인이 필요합니다.',
        },
        { status: 401 },
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { content } = body;

    // 입력 검증
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid content format',
        },
        { status: 400 },
      );
    }

    // 댓글 작성
    const comment = await createComment({
      content,
      reviewId,
      userId: currentUser.id,
    });

    return NextResponse.json({
      success: true,
      data: comment,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error instanceof Error ? error : new Error(String(error)),
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create comment',
        requestId,
      },
      { status: 500 },
    );
  }
}

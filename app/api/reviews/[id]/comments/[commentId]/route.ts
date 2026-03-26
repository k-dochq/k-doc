import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from 'entities/comment';
import { AuthService } from 'shared/lib/auth/server';
import { routeErrorLogger } from 'shared/lib';

interface RouteParams {
  params: Promise<{
    id: string;
    commentId: string;
  }>;
}

/**
 * 댓글 삭제 Route Handler
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const endpoint = '/api/reviews/[id]/comments/[commentId]';
  const method = 'DELETE';

  try {
    const { commentId } = await params;

    const authService = new AuthService();
    const currentUser = await authService.getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: '로그인이 필요합니다.' },
        { status: 401 },
      );
    }

    await deleteComment({ commentId, userId: currentUser.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === '본인이 작성한 댓글만 삭제할 수 있습니다.') {
      return NextResponse.json({ success: false, error: error.message }, { status: 403 });
    }

    if (error instanceof Error && error.message === '댓글을 찾을 수 없습니다.') {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }

    const requestId = routeErrorLogger.logError({
      error: error instanceof Error ? error : new Error(String(error)),
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      { success: false, error: 'Failed to delete comment', requestId },
      { status: 500 },
    );
  }
}

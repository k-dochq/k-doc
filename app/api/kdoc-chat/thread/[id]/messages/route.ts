import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/kdoc-chat/thread/[id]/messages — 메시지 목록 (커서 페이지네이션)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { id: threadId } = await params;
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const cursor = searchParams.get('cursor');

    // 접근 권한: 본인 thread만 조회 가능
    const thread = await prisma.kdocChatThread.findFirst({
      where: { id: threadId, userId: session.user.id },
    });
    if (!thread) {
      return NextResponse.json({ success: false, error: 'THREAD_NOT_FOUND' }, { status: 404 });
    }

    const limit = Math.min(Math.max(parseInt(limitParam || '50', 10) || 50, 1), 100);

    const messages = await prisma.kdocChatMessage.findMany({
      where: {
        threadId,
        ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
    });

    const hasMore = messages.length > limit;
    const sliced = hasMore ? messages.slice(0, -1) : messages;
    const ordered = sliced.reverse(); // 오래된→최신순
    const nextCursor = hasMore ? ordered[0]?.createdAt?.toISOString() : null;

    return NextResponse.json({ success: true, messages: ordered, hasMore, nextCursor });
  } catch (error) {
    console.error('GET /api/kdoc-chat/thread/[id]/messages error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

// POST /api/kdoc-chat/thread/[id]/messages — 메시지 전송
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { id: threadId } = await params;
    const { content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ success: false, error: 'MISSING_CONTENT' }, { status: 400 });
    }

    // 접근 권한 확인
    const thread = await prisma.kdocChatThread.findFirst({
      where: { id: threadId, userId: session.user.id },
    });
    if (!thread) {
      return NextResponse.json({ success: false, error: 'THREAD_NOT_FOUND' }, { status: 404 });
    }
    if (thread.status === 'CLOSED') {
      return NextResponse.json({ success: false, error: 'THREAD_CLOSED' }, { status: 403 });
    }

    const message = await prisma.kdocChatMessage.create({
      data: {
        id: uuidv4(),
        threadId,
        senderType: 'USER',
        content: content.trim(),
        createdAt: new Date(),
      },
    });

    // thread updatedAt 갱신
    await prisma.kdocChatThread.update({
      where: { id: threadId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('POST /api/kdoc-chat/thread/[id]/messages error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

interface CreateThreadBody {
  category: 'PLASTIC_SURGERY' | 'DERMATOLOGY_AESTHETIC' | 'CONCIERGE_RESERVATION' | 'OTHER_INQUIRY';
  guestName?: string;
  guestEmail?: string;
  guestNationality?: string;
  /** 운영시간 분기에 따른 CMS 완료 메시지 — 제공 시 어드민 메시지로 자동 저장 */
  autoReplyMessage?: string;
}

// POST /api/kdoc-chat/thread — thread 생성 (회원/비회원 모두 허용)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // 비회원이면 userId null, 회원이면 session userId 사용
    const userId = session?.user?.id ?? null;

    const body: CreateThreadBody = await request.json();
    const { category, guestName, guestEmail, guestNationality, autoReplyMessage } = body;

    if (!category) {
      return NextResponse.json({ success: false, error: 'MISSING_CATEGORY' }, { status: 400 });
    }

    const thread = await prisma.kdocChatThread.create({
      data: {
        id: uuidv4(),
        category,
        userId,
        guestName: guestName ?? null,
        guestEmail: guestEmail ?? null,
        guestNationality: guestNationality ?? null,
        updatedAt: new Date(),
      },
    });

    if (autoReplyMessage?.trim()) {
      await prisma.kdocChatMessage.create({
        data: {
          id: uuidv4(),
          threadId: thread.id,
          senderType: 'ADMIN',
          content: autoReplyMessage.trim(),
        },
      });
    }

    return NextResponse.json({ success: true, thread });
  } catch (error) {
    console.error('POST /api/kdoc-chat/thread error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

// GET /api/kdoc-chat/thread — 회원의 활성 thread 목록 조회
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const threads = await prisma.kdocChatThread.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({ success: true, threads });
  } catch (error) {
    console.error('GET /api/kdoc-chat/thread error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

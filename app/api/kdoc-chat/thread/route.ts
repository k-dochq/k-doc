import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

interface CreateThreadBody {
  category: 'PLASTIC_SURGERY' | 'DERMATOLOGY_AESTHETIC' | 'CONCIERGE_RESERVATION' | 'OTHER_INQUIRY';
  guestName?: string;
  guestEmail?: string;
  guestNationality?: string;
}

// POST /api/kdoc-chat/thread — thread 생성 (회원/비회원 모두 허용)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // 비회원이면 userId null, 회원이면 session userId 사용
    const userId = session?.user?.id ?? null;

    const body: CreateThreadBody = await request.json();
    const { category, guestName, guestEmail, guestNationality } = body;

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

    return NextResponse.json({ success: true, thread });
  } catch (error) {
    console.error('POST /api/kdoc-chat/thread error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

const threadWithLastMessageArgs = {
  orderBy: { updatedAt: 'desc' as const },
  include: {
    KdocChatMessage: {
      orderBy: { createdAt: 'desc' as const },
      take: 1,
    },
  },
} as const;

type RawThreadWithMessage = Awaited<
  ReturnType<typeof prisma.kdocChatThread.findMany<typeof threadWithLastMessageArgs>>
>[number];

function serializeThread(t: RawThreadWithMessage) {
  const last = t.KdocChatMessage[0] ?? null;
  return {
    id: t.id,
    status: t.status,
    category: t.category,
    userId: t.userId,
    guestName: t.guestName,
    guestEmail: t.guestEmail,
    guestNationality: t.guestNationality,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    lastMessageContent: last?.content ?? null,
    lastMessageDate: last?.createdAt ?? null,
    lastMessageSenderType: last?.senderType ?? null,
  };
}

// GET /api/kdoc-chat/thread — thread 목록 조회
// ?guestIds=id1,id2  → 특정 ID 배열로 조회 (비회원 localStorage 스레드용)
// (파라미터 없음)    → 로그인 유저의 전체 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const guestIdsParam = searchParams.get('guestIds');

    // 게스트 ID 지정 조회 (인증 불필요 — UUID 추측 불가)
    if (guestIdsParam) {
      const ids = guestIdsParam.split(',').filter(Boolean).slice(0, 20);
      const raw = await prisma.kdocChatThread.findMany({
        where: { id: { in: ids } },
        ...threadWithLastMessageArgs,
      });
      return NextResponse.json({ success: true, threads: raw.map(serializeThread) });
    }

    // 로그인 유저 목록 조회
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const raw = await prisma.kdocChatThread.findMany({
      where: { userId: session.user.id },
      take: 50,
      ...threadWithLastMessageArgs,
    });

    return NextResponse.json({ success: true, threads: raw.map(serializeThread) });
  } catch (error) {
    console.error('GET /api/kdoc-chat/thread error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

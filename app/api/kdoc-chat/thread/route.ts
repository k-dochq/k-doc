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

// POST /api/kdoc-chat/thread — thread 생성
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body: CreateThreadBody = await request.json();
    const { category, guestName, guestEmail, guestNationality } = body;

    if (!category) {
      return NextResponse.json({ success: false, error: 'MISSING_CATEGORY' }, { status: 400 });
    }

    // 비회원(anonymous)이면 게스트 정보 필수
    const isAnonymous = session.user.is_anonymous;
    if (isAnonymous && (!guestName || !guestEmail || !guestNationality)) {
      return NextResponse.json({ success: false, error: 'MISSING_GUEST_INFO' }, { status: 400 });
    }

    const thread = await prisma.kdocChatThread.create({
      data: {
        id: uuidv4(),
        category,
        userId: session.user.id,
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

// GET /api/kdoc-chat/thread — 현재 사용자의 활성 thread 조회
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

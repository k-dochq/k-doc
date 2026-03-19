import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { type Locale } from 'shared/config';
import { K_DOC_TEST_HOSPITAL_ID } from 'entities/hospital/api/entities/types';

interface ConciergeChatMessageBody {
  content: string;
  senderType?: 'USER' | 'ADMIN';
}

// 요청에서 locale 추출 (기존 consultation-messages와 동일 로직)
function extractLocaleFromRequest(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const referer = request.headers.get('referer') || '';

  const refererMatch = referer.match(/\/(ko|en|th|zh-Hant|ja|hi)\//);
  if (refererMatch) {
    return refererMatch[1] as Locale;
  }

  if (acceptLanguage.includes('ko')) return 'ko';
  if (acceptLanguage.includes('th')) return 'th';
  if (acceptLanguage.includes('en')) return 'en';

  return 'ko';
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const cursor = searchParams.get('cursor');

    const limit = (() => {
      const n = parseInt(limitParam || '50', 10);
      if (Number.isNaN(n)) return 50;
      return Math.min(Math.max(n, 1), 100);
    })();

    const baseWhere = {
      userId: session.user.id,
      hospitalId: K_DOC_TEST_HOSPITAL_ID,
      ...(cursor
        ? {
            createdAt: {
              lt: new Date(cursor),
            },
          }
        : {}),
    } as const;

    const items = await prisma.consultationMessage.findMany({
      where: baseWhere,
      include: {
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1,
    });

    const hasMore = items.length > limit;
    const sliced = hasMore ? items.slice(0, -1) : items;
    const messages = sliced.reverse();
    const nextCursor = hasMore ? messages[0]?.createdAt?.toISOString() : null;

    return NextResponse.json({
      success: true,
      hospitalId: K_DOC_TEST_HOSPITAL_ID,
      messages,
      hasMore,
      nextCursor,
      limit,
    });
  } catch (error) {
    console.error('Get concierge consultation messages error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body = (await request.json()) as ConciergeChatMessageBody;
    const locale = extractLocaleFromRequest(request);
    void locale; // 현재는 콘텐츠만 저장, locale은 추후 확장 대비

    const { content, senderType = 'USER' } = body;
    if (!content) {
      return NextResponse.json({ success: false, error: 'MISSING_REQUIRED_FIELDS' }, { status: 400 });
    }

    // K-DOC 병원 고정. isActive와 무관하게 메시지 저장.
    const message = await prisma.consultationMessage.create({
      data: {
        id: uuidv4(),
        userId: session.user.id,
        hospitalId: K_DOC_TEST_HOSPITAL_ID,
        senderType,
        content,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        messageId: message.id,
        hospitalId: K_DOC_TEST_HOSPITAL_ID,
      },
    });
  } catch (error) {
    console.error('POST concierge consultation messages error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}


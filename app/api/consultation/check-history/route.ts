import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { hospitalId } = await request.json();

    if (!hospitalId) {
      return NextResponse.json({ error: 'Hospital ID is required' }, { status: 400 });
    }

    // 병원과 사용자 간의 상담 메시지 내역이 있는지 확인
    const consultationHistory = await prisma.consultationMessage.findFirst({
      where: {
        hospitalId: hospitalId,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      hasHistory: !!consultationHistory,
      consultationId: consultationHistory?.id || null,
    });
  } catch (error) {
    console.error('Error checking consultation history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

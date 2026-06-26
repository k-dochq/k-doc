import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

interface PatchThreadBody {
  category?: 'PLASTIC_SURGERY' | 'DERMATOLOGY_AESTHETIC' | 'CONCIERGE_RESERVATION' | 'OTHER_INQUIRY';
  guestName?: string;
  guestEmail?: string;
  guestNationality?: string;
}

// PATCH /api/kdoc-chat/thread/[id] — 스레드 정보 업데이트 (category, 게스트 정보)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: PatchThreadBody = await request.json();
    const { category, guestName, guestEmail, guestNationality } = body;

    const data: Record<string, unknown> = { updatedAt: new Date() };
    if (category) data.category = category;
    if (guestName !== undefined) data.guestName = guestName;
    if (guestEmail !== undefined) data.guestEmail = guestEmail;
    if (guestNationality !== undefined) data.guestNationality = guestNationality;

    const thread = await prisma.kdocChatThread.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, thread });
  } catch (error) {
    console.error('PATCH /api/kdoc-chat/thread/[id] error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

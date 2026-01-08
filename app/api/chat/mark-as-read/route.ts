import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { messageId, hospitalId } = await request.json();

    if (!messageId || !hospitalId) {
      return NextResponse.json(
        { success: false, error: 'messageId and hospitalId are required' },
        { status: 400 },
      );
    }

    // 관리자 메시지만 읽음 처리
    const result = await prisma.consultationMessage.updateMany({
      where: {
        id: messageId,
        hospitalId,
        senderType: 'ADMIN',
        isRead: false, // 아직 읽지 않은 메시지만
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, updated: result.count });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mark message as read' },
      { status: 500 },
    );
  }
}

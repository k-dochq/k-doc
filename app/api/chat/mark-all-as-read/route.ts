import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';

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

    const { hospitalId } = await request.json();
    if (!hospitalId) {
      return NextResponse.json(
        { success: false, error: 'hospitalId is required' },
        { status: 400 },
      );
    }

    const result = await prisma.consultationMessage.updateMany({
      where: {
        userId: session.user.id,
        hospitalId,
        senderType: 'ADMIN',
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, updated: result.count });
  } catch (error) {
    console.error('Error marking all messages as read:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mark messages as read' },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { routeErrorLogger } from 'shared/lib';
import { prisma } from 'shared/lib/prisma';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/email/check-email';
  const method = 'POST';

  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // 이메일 존재 여부 확인 (Prisma 직접 사용)
    const user = await prisma.user.findFirst({
      where: {
        email: email.trim(),
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, exists: !!user });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      { success: false, error: 'Internal server error', requestId },
      { status: 500 },
    );
  }
}

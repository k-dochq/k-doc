import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { routeErrorLogger } from 'shared/lib';
import { createChangeRequest } from 'features/reservation-change-request/api/use-cases/create-change-request-use-case';
import type { Locale } from 'shared/config';
import { isValidLocale } from 'shared/config';

function extractLocale(request: NextRequest): Locale {
  const referer = request.headers.get('referer') || '';
  const match = referer.match(/\/(ko|en|th|zh-Hant|ja|hi|tl|ar|ru)\//);
  if (match && isValidLocale(match[1])) return match[1] as Locale;
  const acceptLang = request.headers.get('accept-language') || '';
  if (acceptLang.includes('ko')) return 'ko';
  if (acceptLang.includes('th')) return 'th';
  if (acceptLang.includes('ja')) return 'ja';
  if (acceptLang.includes('zh')) return 'zh-Hant';
  return 'en';
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const endpoint = '/api/reservations/[id]/change-request';
  const method = 'POST';

  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { id: reservationId } = await params;
    if (!reservationId) {
      return NextResponse.json({ success: false, error: 'MISSING_RESERVATION_ID' }, { status: 400 });
    }

    const body = (await request.json()) as { requestedDate?: string; requestedTime?: string };
    const { requestedDate, requestedTime } = body;

    if (!requestedDate || !requestedTime) {
      return NextResponse.json(
        { success: false, error: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 },
      );
    }

    const locale = extractLocale(request);

    const result = await createChangeRequest({
      reservationId,
      userId: session.user.id,
      requestedDate,
      requestedTime,
      locale,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR', requestId },
      { status: 500 },
    );
  }
}

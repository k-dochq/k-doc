import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { routeErrorLogger, redirectToAuthFailure } from 'shared/lib';
import { extractLocaleFromCookie } from 'shared/lib/locale';

export async function GET(request: NextRequest) {
  const endpoint = '/auth/callback';
  const method = 'GET';

  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      const supabase = await createClient();
      const { error, data } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        // 성공적으로 로그인된 경우 홈페이지로 리다이렉트
        const locale = extractLocaleFromCookie(request);
        return NextResponse.redirect(`${origin}/${locale}`);
      }
    }

    // 인증 코드가 없거나 인증 실패 시
    const authError = new Error('Authentication code error or invalid code');
    const requestId = routeErrorLogger.logError({
      error: authError,
      endpoint,
      method,
      request,
    });

    const locale = extractLocaleFromCookie(request);
    return redirectToAuthFailure({
      request,
      locale,
      errorCode: 'AUTH_CODE_ERROR',
      errorMessage: authError.message,
      requestId,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    const locale = extractLocaleFromCookie(request);
    return redirectToAuthFailure({
      request,
      locale,
      errorCode: 'AUTH_CODE_ERROR',
      errorMessage: (error as Error).message,
      requestId,
    });
  }
}

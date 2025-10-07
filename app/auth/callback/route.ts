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
    const oauthError = searchParams.get('error');
    const oauthErrorDescription =
      searchParams.get('error_description') || searchParams.get('message');

    // 쿠키에서 redirectTo 경로 가져오기
    const cookies = request.cookies;
    const redirectTo = cookies.get('auth_redirect_path')?.value;

    if (code) {
      const supabase = await createClient();
      const { error, data } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data?.user) {
        // 성공적으로 로그인된 경우
        const locale = extractLocaleFromCookie(request);

        // 신규 가입 여부 확인 - identities 테이블 기준으로 정확하게 판단
        // identities 테이블에서 해당 provider의 created_at과 updated_at이 같으면 신규 가입
        const isNewUser =
          data.user.identities?.some(
            (identity) =>
              identity.provider === data.user.app_metadata?.provider &&
              identity.created_at === identity.updated_at,
          ) || false;

        // 소셜 로그인 여부 확인 (OAuth 제공자가 있으면 소셜 로그인)
        const isSocialLogin =
          data.user.app_metadata?.provider && data.user.app_metadata?.provider !== 'email';

        // 소셜 로그인 신규 가입자는 추가정보 입력 페이지로 리다이렉트
        let targetUrl: string;
        if (isNewUser && isSocialLogin) {
          targetUrl = `${origin}/${locale}/auth/additional-info${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`;
        } else {
          // 기존 사용자 또는 이메일 가입자는 원래 경로로
          targetUrl = redirectTo
            ? `${origin}${decodeURIComponent(redirectTo)}`
            : `${origin}/${locale}/main`;
        }

        // 리다이렉트 응답 생성
        const response = NextResponse.redirect(targetUrl);

        // 사용한 쿠키 삭제
        response.cookies.delete('auth_redirect_path');

        return response;
      }

      // 교환 과정에서 실패했다면 Supabase 에러 메시지를 우선 사용
      if (error) {
        const requestId = routeErrorLogger.logError({
          error,
          endpoint,
          method,
          request,
        });

        const locale = extractLocaleFromCookie(request);
        return redirectToAuthFailure({
          request,
          locale,
          errorCode: 'AUTH_CODE_ERROR',
          errorMessage: error.message,
          requestId,
        });
      }
    }

    // 인증 코드가 없거나, OAuth 단계에서 전달된 에러가 있는 경우
    const authError = new Error(
      oauthErrorDescription || oauthError || 'Authentication code error or invalid code',
    );
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

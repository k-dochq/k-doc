import { type NextRequest, NextResponse } from 'next/server';
import { createClientForMiddleware } from 'shared/lib/supabase/server';
import { getAuthPath, isProtectedRoute } from 'shared/lib/auth';
import { getRedirectAfterLoginPath } from 'shared/lib/auth/route-guard';
import { type Locale } from 'shared/config/locales';

/**
 * Next.js 미들웨어용 인증 가드 함수
 * 보호된 경로에 접근하는 사용자의 인증 상태를 확인하고
 * 인증되지 않은 사용자는 로그인 페이지로 리다이렉트합니다.
 * 로그인된 사용자가 /auth로 시작하는 경로에 접근하면 메인 페이지로 리다이렉트합니다.
 */
export async function authGuard(request: NextRequest, locale: Locale) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createClientForMiddleware(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 보호된 경로인지 확인
  const isProtected = isProtectedRoute(request.nextUrl.pathname);

  // /auth로 시작하는 경로인지 확인 (locale 제외)
  const pathnameWithoutLocale = request.nextUrl.pathname.replace(`/${locale}`, '') || '/';
  const isAuthRoute = pathnameWithoutLocale.startsWith('/auth');

  // 로그인된 사용자가 /auth로 시작하는 경로에 접근하는 경우
  if (session && isAuthRoute) {
    const mainPath = getRedirectAfterLoginPath(locale);
    const url = request.nextUrl.clone();
    url.pathname = mainPath;
    url.searchParams.delete('redirect'); // redirect 파라미터 제거

    return NextResponse.redirect(url);
  }

  // 로그인되지 않은 사용자가 보호된 경로에 접근하는 경우
  if (!session && isProtected) {
    const authPath = getAuthPath(locale);
    const url = request.nextUrl.clone();
    url.pathname = authPath;

    // 원래 URL을 redirect 쿼리 파라미터로 전달
    url.searchParams.set('redirect', request.nextUrl.pathname);

    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { extractLocaleFromCookie } from 'shared/lib/locale';

export async function GET(request: NextRequest) {
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

    // 인증 코드가 없거나 인증 실패 시 에러 페이지로 리다이렉트
    console.error('Auth callback error: No code or authentication failed');
    const locale = extractLocaleFromCookie(request);
    return NextResponse.redirect(`${origin}/${locale}/auth/auth-code-error`);
  } catch (error) {
    console.error('Auth callback error:', error);

    // 에러 발생 시에도 에러 페이지로 리다이렉트
    const locale = extractLocaleFromCookie(request);
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/${locale}/auth/auth-code-error`);
  }
}

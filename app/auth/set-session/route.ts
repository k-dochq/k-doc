import { NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { DEFAULT_LOCALE } from 'shared/config';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    const locale = searchParams.get('locale');
    const redirectPath = searchParams.get('redirectPath');

    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { ok: false, error: 'Missing access_token or refresh_token' },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.setSession({ access_token, refresh_token });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    // 성공 시: Supabase가 Set-Cookie로 세션을 설정함
    // locale과 redirectPath에 따라 적절한 경로로 리다이렉트
    let redirectUrl = '/main';

    if (locale && redirectPath) {
      // locale과 redirectPath가 모두 있으면 해당 경로로
      redirectUrl = `/${locale}${redirectPath}`;
    } else if (locale) {
      // locale만 있으면 해당 locale의 main으로
      redirectUrl = `/${locale}/main`;
    } else if (redirectPath) {
      // redirectPath만 있으면 기본 locale로
      redirectUrl = `/${DEFAULT_LOCALE}${redirectPath}`;
    }

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

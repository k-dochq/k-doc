import { NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';

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
    // redirectPath가 있으면 그대로 사용, 없으면 locale/main으로 이동
    let redirectUrl = '/main';

    if (redirectPath) {
      // redirectPath가 있으면 그대로 사용 (이미 locale 포함)
      redirectUrl = redirectPath;
    } else if (locale) {
      // redirectPath가 없고 locale이 있으면 locale/main으로
      redirectUrl = `/${locale}/main`;
    }

    console.log('redirectUrl', redirectUrl);

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

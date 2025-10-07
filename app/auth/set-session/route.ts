import { NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');

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
    return NextResponse.redirect(new URL('/main', req.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

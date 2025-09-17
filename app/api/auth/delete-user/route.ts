import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from 'shared/lib/supabase/server';
import { createServiceRoleClient } from 'shared/lib/supabase/service-role-client';

export async function DELETE(_request: NextRequest) {
  try {
    // 서버 클라이언트로 현재 사용자 세션 확인
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ success: false, error: '인증이 필요합니다.' }, { status: 401 });
    }

    // Service Role 클라이언트로 사용자 삭제
    const supabaseAdmin = createServiceRoleClient();
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error('사용자 삭제 중 오류:', deleteError);
      return NextResponse.json(
        { success: false, error: '회원탈퇴 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('회원탈퇴 API 오류:', error);
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

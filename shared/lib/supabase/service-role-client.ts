import { createClient } from '@supabase/supabase-js';

/**
 * 서버 측에서만 사용하는 Supabase Service Role 클라이언트
 * 관리자 권한이 필요한 작업(사용자 삭제, 관리자 기능 등)에 사용
 *
 * ⚠️ 주의: 이 클라이언트는 서버 측에서만 사용해야 합니다.
 * 클라이언트 측에서 사용하면 보안 위험이 있습니다.
 */
export function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL 환경 변수가 설정되지 않았습니다.');
  }

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY 환경 변수가 설정되지 않았습니다.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

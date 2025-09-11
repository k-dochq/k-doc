import 'server-only';

import { createClient } from 'shared/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

/**
 * 인증 서비스 - Supabase 인증 처리
 */
export class AuthService {
  /**
   * 현재 사용자 세션 조회
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const supabase = await createClient();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        return null;
      }

      return session.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * 사용자 인증 상태 확인
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}

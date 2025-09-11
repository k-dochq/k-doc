import 'server-only';

import { createClient } from 'shared/lib/supabase/server';
import type { User } from '@supabase/supabase-js';

export interface IAuthService {
  getCurrentUser(): Promise<User>;
  getCurrentUserOrNull(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
  validateUserAccess(userId: string, requestedUserId: string): boolean;
}

/**
 * 공통 인증 서비스 - Supabase 인증 처리
 * 모든 features에서 재사용 가능한 인증 관련 기능 제공
 */
export class AuthService implements IAuthService {
  /**
   * 현재 사용자 세션 조회 (인증되지 않은 경우 에러 발생)
   */
  async getCurrentUser(): Promise<User> {
    try {
      const supabase = await createClient();
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError) {
        throw new Error(`Authentication error: ${authError.message}`);
      }

      if (!session?.user) {
        throw new Error('User not authenticated');
      }

      return session.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error instanceof Error ? error : new Error('Failed to get current user');
    }
  }

  /**
   * 현재 사용자 세션 조회 (인증되지 않은 경우 null 반환)
   */
  async getCurrentUserOrNull(): Promise<User | null> {
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
    const user = await this.getCurrentUserOrNull();
    return !!user;
  }

  /**
   * 사용자 접근 권한 검증
   * @param userId 현재 사용자 ID
   * @param requestedUserId 요청된 사용자 ID
   * @returns 접근 권한 여부
   */
  validateUserAccess(userId: string, requestedUserId: string): boolean {
    // 사용자는 자신의 데이터만 접근할 수 있음
    return userId === requestedUserId;
  }
}

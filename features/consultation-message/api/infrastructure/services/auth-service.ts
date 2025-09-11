import { createClient } from 'shared/lib/supabase/server';
import { type User } from '@supabase/supabase-js';

export interface IAuthService {
  getCurrentUser(): Promise<User>;
  validateUserAccess(userId: string, requestedUserId: string): boolean;
}

export class AuthService implements IAuthService {
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

  validateUserAccess(userId: string, requestedUserId: string): boolean {
    // 사용자는 자신의 메시지만 조회할 수 있음
    return userId === requestedUserId;
  }
}

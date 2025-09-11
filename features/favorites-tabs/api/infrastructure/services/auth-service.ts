import { createClient } from 'shared/lib/supabase/server';

export interface IAuthService {
  getCurrentUser(): Promise<{ id: string; email?: string } | null>;
}

export class AuthService implements IAuthService {
  async getCurrentUser(): Promise<{ id: string; email?: string } | null> {
    try {
      const supabase = await createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

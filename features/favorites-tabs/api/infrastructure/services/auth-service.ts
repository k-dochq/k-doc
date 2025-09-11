import { createClient } from 'shared/lib/supabase/server';

export interface IAuthService {
  getCurrentUser(): Promise<{ id: string; email?: string } | null>;
}

export class AuthService implements IAuthService {
  async getCurrentUser(): Promise<{ id: string; email?: string } | null> {
    try {
      const supabase = await createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        return null;
      }

      return {
        id: session.user.id,
        email: session.user.email,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

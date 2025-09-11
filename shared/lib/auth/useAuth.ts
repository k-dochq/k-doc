'use client';

import { useState, useEffect } from 'react';
import { type User } from '@supabase/supabase-js';
import { createClient } from 'shared/lib/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 현재 사용자 세션 가져오기
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // 인증 상태 변화 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}

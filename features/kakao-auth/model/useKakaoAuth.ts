'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase';
import type { Locale } from 'shared/config';

interface UseKakaoAuthOptions {
  locale: Locale;
}

export function useKakaoAuth(options: UseKakaoAuthOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentLocale = options.locale;
  const supabase = createClient();

  const signInWithKakao = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'account_email',
        },
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during Kakao login.';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during logout.';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithKakao,
    signOut,
    isLoading,
    error,
  };
}

'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase';
import type { Locale } from 'shared/config';

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 환경에 따른 올바른 redirect URL 설정
      const isProduction =
        window.location.hostname === 'k-doc.kr' || window.location.hostname === 'www.k-doc.kr';
      const redirectUrl = isProduction
        ? 'https://www.k-doc.kr/auth/callback'
        : `${window.location.origin}/auth/callback`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during Google login.';
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
    signInWithGoogle,
    signOut,
    isLoading,
    error,
  };
}

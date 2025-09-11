'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { type Dictionary } from 'shared/model/types';

interface UseEmailLoginProps {
  locale: Locale;
  dict: Dictionary;
}

interface LoginResult {
  success: boolean;
  error?: string;
  data?: User;
}

export function useEmailLogin({ locale, dict }: UseEmailLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithEmail = async (email: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Login error:', signInError);

        // Supabase 에러 메시지를 dict로 변환
        let errorMessage = signInError.message;
        if (signInError.message.includes('Invalid login credentials')) {
          errorMessage =
            dict.auth?.signup?.errors?.invalidCredentials ||
            '이메일 또는 비밀번호가 올바르지 않습니다';
        } else if (signInError.message.includes('Email not confirmed')) {
          errorMessage =
            dict.auth?.signup?.errors?.emailNotConfirmed || '이메일을 확인하고 계정을 인증해주세요';
        }

        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (data?.user) {
        console.log('Login successful:', data.user);
        return { success: true, data: data.user };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (err) {
      const errorMessage =
        dict.auth?.signup?.errors?.unexpectedError || '예상치 못한 오류가 발생했습니다';

      console.error('Login error:', err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithEmail,
    isLoading,
    error,
  };
}

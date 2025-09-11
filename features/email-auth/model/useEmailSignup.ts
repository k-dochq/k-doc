'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type Locale } from 'shared/config';
import { type User } from '@supabase/supabase-js';
import { type Dictionary } from 'shared/model/types';

interface UseEmailSignupProps {
  locale: Locale;
  dict: Dictionary;
}

interface SignupResult {
  success: boolean;
  error?: string;
  data?: User;
}

export function useEmailSignup({ locale, dict }: UseEmailSignupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpWithEmail = async (email: string, password: string): Promise<SignupResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);

        // Supabase 에러 메시지를 dict로 변환
        let errorMessage = signUpError.message;
        if (signUpError.message.includes('already registered')) {
          errorMessage =
            dict.auth?.signup?.errors?.emailAlreadyRegistered || '이미 등록된 이메일입니다';
        } else if (signUpError.message.includes('Password should be')) {
          errorMessage =
            dict.auth?.signup?.errors?.passwordTooShort || '비밀번호는 최소 6자 이상이어야 합니다';
        } else if (signUpError.message.includes('Invalid email')) {
          errorMessage =
            dict.auth?.signup?.errors?.invalidEmail || '올바른 이메일 주소를 입력해주세요';
        }

        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (data?.user) {
        console.log('Signup successful:', data.user);
        return { success: true, data: data.user };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (err) {
      const errorMessage =
        dict.auth?.signup?.errors?.unexpectedError || '예상치 못한 오류가 발생했습니다';

      console.error('Signup error:', err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUpWithEmail,
    isLoading,
    error,
  };
}

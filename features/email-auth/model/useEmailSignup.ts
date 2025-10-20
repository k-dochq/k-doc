'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { createClient } from 'shared/lib/supabase/client';
import { generateNickname } from 'shared/lib/nickname-generator';
import { trackSignUpComplete } from 'shared/lib/analytics';

interface UseEmailSignupParams {
  locale: Locale;
  dict: Dictionary;
}

interface SignupData {
  email: string;
  password: string;
  passportName?: string;
  nationality?: string;
  gender?: string;
  countryCode?: string;
  phoneNumberOnly?: string;
  birthDate?: string;
  marketingNotifications?: boolean;
}

interface UseEmailSignupReturn {
  signUpWithEmail: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

export function useEmailSignup({ locale, dict }: UseEmailSignupParams): UseEmailSignupReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpWithEmail = async (
    signupData: SignupData,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // 닉네임 생성 (이메일을 시드로 사용하여 재현 가능하게)
      const nicknameResult = await generateNickname({
        style: 'pascal',
        suffix: 'tag2',
        maxLength: 20,
        seed: signupData.email, // 이메일을 시드로 사용하여 재현 가능
        avoidAmbiguous: true,
      });

      // 메타데이터 준비
      const metadata: Record<string, string | boolean> = {
        nickname: nicknameResult.display, // 생성된 닉네임 추가
      };
      if (signupData.passportName) metadata.passport_name = signupData.passportName;
      if (signupData.nationality) metadata.nationality = signupData.nationality;
      if (signupData.gender) metadata.gender = signupData.gender;
      if (signupData.countryCode) metadata.country_code = signupData.countryCode;
      if (signupData.phoneNumberOnly) metadata.phone_number = signupData.phoneNumberOnly;
      if (signupData.birthDate) metadata.birth_date = signupData.birthDate;
      if (signupData.marketingNotifications !== undefined)
        metadata.marketing_notifications = signupData.marketingNotifications;

      if (!supabase) {
        console.error('Supabase client 생성 실패');
        return { success: false, error: 'Supabase client 생성 실패' };
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: metadata,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user && !data.user.email_confirmed_at) {
        // 이메일 인증이 필요한 경우
        const confirmationMessage =
          dict.auth?.signup?.errors?.signupSuccess ||
          '회원가입이 완료되었습니다. 이메일을 확인하여 계정을 활성화해주세요.';
        setError(confirmationMessage);

        // 회원가입 성공 - GA 이벤트 전송
        trackSignUpComplete('email');
        return { success: true };
      }

      // 회원가입 성공 - GA 이벤트 전송
      trackSignUpComplete('email');
      return { success: true };
    } catch (err) {
      let errorMessage = dict.auth?.signup?.signupError || '회원가입 중 오류가 발생했습니다';

      if (err instanceof Error) {
        // Supabase 에러 메시지 매핑
        if (err.message.includes('User already registered')) {
          errorMessage =
            dict.auth?.signup?.errors?.userAlreadyRegistered ||
            dict.auth?.signup?.errors?.emailAlreadyRegistered ||
            '이미 가입된 이메일입니다.';
        } else if (err.message.includes('Password should be at least')) {
          errorMessage =
            dict.auth?.signup?.errors?.passwordTooShortServer ||
            dict.auth?.signup?.errors?.passwordTooShort ||
            '비밀번호는 최소 6자 이상이어야 합니다.';
        } else if (err.message.includes('Invalid email')) {
          errorMessage =
            dict.auth?.signup?.errors?.invalidEmail || '올바른 이메일 주소를 입력해주세요.';
        } else {
          errorMessage = dict.auth?.signup?.errors?.unexpectedError || err.message;
        }
      }

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

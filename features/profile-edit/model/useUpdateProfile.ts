'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface UpdateProfileData {
  nickname: string;
  name: string;
}

interface UseUpdateProfileParams {
  locale: Locale;
  dict: Dictionary;
}

interface UseUpdateProfileReturn {
  updateProfile: (data: UpdateProfileData) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export function useUpdateProfile({ locale, dict }: UseUpdateProfileParams): UseUpdateProfileReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateProfile = async (
    data: UpdateProfileData,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const supabase = createClient();

      // Supabase updateUser를 사용하여 사용자 메타데이터 업데이트
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          nickname: data.nickname,
          name: data.name,
        },
      });

      if (updateError) {
        throw updateError;
      }

      setIsSuccess(true);
      return { success: true };
    } catch (err) {
      let errorMessage = dict.my?.profile?.edit?.error || '프로필 업데이트 중 오류가 발생했습니다';

      if (err instanceof Error) {
        if (err.message.includes('User not found')) {
          errorMessage = '사용자를 찾을 수 없습니다.';
        } else if (err.message.includes('Invalid')) {
          errorMessage = '입력한 정보가 유효하지 않습니다.';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
    isSuccess,
  };
}

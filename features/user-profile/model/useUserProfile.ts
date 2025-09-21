'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type UserProfile } from 'shared/model/types/user';

interface UserProfileResponse {
  success: boolean;
  data?: UserProfile;
  error?: string;
}

async function fetchUserProfile(): Promise<UserProfile> {
  const response = await fetch('/api/user');

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다');
    }
    throw new Error('사용자 정보를 불러올 수 없습니다');
  }

  const result: UserProfileResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || '사용자 정보를 불러올 수 없습니다');
  }

  return result.data;
}

export function useUserProfile() {
  return useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음
      if (error instanceof Error && error.message.includes('로그인이 필요합니다')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

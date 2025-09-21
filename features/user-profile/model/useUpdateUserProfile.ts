'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import {
  type UpdateUserProfileRequest,
  type UpdateUserProfileResponse,
} from 'shared/model/types/user';

async function updateUserProfile(
  data: UpdateUserProfileRequest,
): Promise<UpdateUserProfileResponse> {
  const response = await fetch('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('로그인이 필요합니다');
    }
    throw new Error('사용자 정보를 업데이트할 수 없습니다');
  }

  const result: UpdateUserProfileResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || '사용자 정보를 업데이트할 수 없습니다');
  }

  return result;
}

interface UseUpdateUserProfileOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useUpdateUserProfile({ onSuccess, onError }: UseUpdateUserProfileOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // 사용자 프로필 캐시 업데이트
      queryClient.setQueryData(queryKeys.user.profile(), data.data);

      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
}

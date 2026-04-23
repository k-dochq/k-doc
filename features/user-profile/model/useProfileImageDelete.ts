'use client';

import { useCallback } from 'react';
import { useUpdateUserProfile } from './useUpdateUserProfile';

interface UseProfileImageDeleteOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useProfileImageDelete(options?: UseProfileImageDeleteOptions) {
  const updateProfile = useUpdateUserProfile({
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteProfileImage = useCallback(async () => {
    await updateProfile.mutateAsync({ profileImgUrl: null });
  }, [updateProfile]);

  return {
    deleteProfileImage,
    isDeleting: updateProfile.isPending,
    error: updateProfile.error,
  };
}

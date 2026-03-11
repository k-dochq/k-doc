'use client';

import { useCallback } from 'react';
import { ProfileImageUploadService } from '../services/profile-image-upload-service';
import { useUpdateUserProfile } from './useUpdateUserProfile';

interface UseProfileImageUploadOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useProfileImageUpload(userId: string | undefined, options?: UseProfileImageUploadOptions) {
  const updateProfile = useUpdateUserProfile({
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const uploadAndUpdate = useCallback(
    async (file: File) => {
      if (!userId) {
        options?.onError?.(new Error('로그인이 필요합니다'));
        return;
      }

      const service = new ProfileImageUploadService();
      const result = await service.uploadProfileImage({ file, userId });

      if (!result.success || !result.url) {
        const err = new Error(result.error ?? '이미지 업로드에 실패했습니다.');
        options?.onError?.(err);
        throw err;
      }

      updateProfile.mutate({ profileImgUrl: result.url });
    },
    [userId, updateProfile, options],
  );

  return {
    uploadProfileImage: uploadAndUpdate,
    isUploading: updateProfile.isPending,
    error: updateProfile.error,
  };
}

'use client';

import { useCallback, useRef } from 'react';
import { type Dictionary } from 'shared/model/types';
import { openDrawer } from 'shared/lib/drawer';
import { confirm, setModalLoading, closeModal } from 'shared/lib/modal';
import { useProfileImageUpload, useProfileImageDelete } from 'features/user-profile';
import {
  ProfileImageActionSheet,
  type ProfileImageActionSheetResult,
} from './ProfileImageActionSheet';

interface UseProfileImageActionsOptions {
  userId: string | undefined;
  profileImgUrl: string | null | undefined;
  dict: Dictionary;
}

export function useProfileImageActions({
  userId,
  profileImgUrl,
  dict,
}: UseProfileImageActionsOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadProfileImage, isUploading, error: uploadError } = useProfileImageUpload(userId);
  const { deleteProfileImage, isDeleting } = useProfileImageDelete();

  const isBusy = isUploading || isDeleting;
  const hasImage = Boolean(profileImgUrl);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        uploadProfileImage(file).catch(() => {
          // 에러는 uploadError로 노출됨
        });
      }
      e.target.value = '';
    },
    [uploadProfileImage],
  );

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const confirmAndDelete = useCallback(async () => {
    const menu = dict.my?.profile?.imageMenu;
    const confirmed = await confirm({
      title: menu?.deleteConfirmTitle ?? 'Delete profile photo?',
      message: menu?.deleteConfirmMessage ?? 'Once deleted, the photo cannot be recovered.',
      confirmText: menu?.deleteConfirmOk ?? 'Delete',
      cancelText: dict.common?.cancel ?? menu?.cancel ?? 'Cancel',
    });

    if (!confirmed) return;

    setModalLoading(true);
    try {
      await deleteProfileImage();
    } catch {
      // 에러는 삭제 훅 내부에서 처리
    } finally {
      setModalLoading(false);
      closeModal();
    }
  }, [dict, deleteProfileImage]);

  const handleAvatarClick = useCallback(async () => {
    if (isBusy) return;

    const result = await openDrawer<ProfileImageActionSheetResult | undefined>({
      content: <ProfileImageActionSheet dict={dict} canDelete={hasImage} />,
    });

    if (result === 'album') {
      openFilePicker();
    } else if (result === 'delete') {
      await confirmAndDelete();
    }
  }, [isBusy, dict, hasImage, openFilePicker, confirmAndDelete]);

  return {
    fileInputRef,
    handleFileChange,
    handleAvatarClick,
    isBusy,
    uploadError,
  };
}

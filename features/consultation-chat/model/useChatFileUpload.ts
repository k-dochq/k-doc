'use client';

import { useState, useCallback } from 'react';
import { ChatFileUploadService } from '../api/infrastructure/services/chat-file-upload-service';

export interface FileUploadResult {
  url: string;
  fileName: string;
  fileSize: number;
}

interface UseChatFileUploadResult {
  isUploading: boolean;
  uploadError: string | null;
  uploadFile: (file: File) => Promise<FileUploadResult | null>;
  clearError: () => void;
}

export function useChatFileUpload(userId: string): UseChatFileUploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadService = new ChatFileUploadService();

  const uploadFile = useCallback(
    async (file: File): Promise<FileUploadResult | null> => {
      if (!file) {
        setUploadError('파일을 선택해주세요');
        return null;
      }

      setIsUploading(true);
      setUploadError(null);

      try {
        const result = await uploadService.uploadFile({
          file,
          userId,
        });

        if (!result.success || !result.url || !result.fileName || result.fileSize === undefined) {
          throw new Error(result.error || '업로드에 실패했습니다');
        }

        return {
          url: result.url,
          fileName: result.fileName,
          fileSize: result.fileSize,
        };
      } catch (error) {
        console.error('File upload error:', error);
        const errorMessage = error instanceof Error ? error.message : '파일 업로드에 실패했습니다';
        setUploadError(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [userId, uploadService],
  );

  const clearError = useCallback(() => {
    setUploadError(null);
  }, []);

  return {
    isUploading,
    uploadError,
    uploadFile,
    clearError,
  };
}

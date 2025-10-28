'use client';

import { useState, useCallback } from 'react';
import { ReviewImageUploadService } from 'entities/review/api/infrastructure/services/review-image-upload-service';
import { type ReviewImageUpload } from 'entities/review/api/entities/types';

interface UseImageUploadResult {
  beforeImages: ReviewImageUpload[];
  afterImages: ReviewImageUpload[];
  isUploading: boolean;
  uploadError: string | null;
  addBeforeImage: (file: File) => Promise<void>;
  addAfterImage: (file: File) => Promise<void>;
  removeBeforeImage: (index: number) => void;
  removeAfterImage: (index: number) => void;
  clearAllImages: () => void;
}

export function useImageUpload(userId: string): UseImageUploadResult {
  const [beforeImages, setBeforeImages] = useState<ReviewImageUpload[]>([]);
  const [afterImages, setAfterImages] = useState<ReviewImageUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadService = new ReviewImageUploadService();

  const addBeforeImage = useCallback(
    async (file: File) => {
      if (beforeImages.length >= 10) {
        setUploadError('Maximum 10 images allowed');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      setIsUploading(true);
      setUploadError(null);

      try {
        // 미리보기 URL 생성
        const preview = URL.createObjectURL(file);

        // Supabase에 업로드
        const result = await uploadService.uploadImage({
          file,
          userId,
          type: 'BEFORE',
        });

        if (!result.success || !result.url) {
          throw new Error(result.error || 'Upload failed');
        }

        // 상태 업데이트
        const newImage: ReviewImageUpload = {
          url: result.url,
          file,
          preview,
          type: 'BEFORE',
        };

        setBeforeImages((prev) => [...prev, newImage]);
      } catch (error) {
        console.error('Image upload error:', error);
        setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    },
    [beforeImages.length, userId, uploadService],
  );

  const addAfterImage = useCallback(
    async (file: File) => {
      if (afterImages.length >= 10) {
        setUploadError('Maximum 10 images allowed');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }

      setIsUploading(true);
      setUploadError(null);

      try {
        // 미리보기 URL 생성
        const preview = URL.createObjectURL(file);

        // Supabase에 업로드
        const result = await uploadService.uploadImage({
          file,
          userId,
          type: 'AFTER',
        });

        if (!result.success || !result.url) {
          throw new Error(result.error || 'Upload failed');
        }

        // 상태 업데이트
        const newImage: ReviewImageUpload = {
          url: result.url,
          file,
          preview,
          type: 'AFTER',
        };

        setAfterImages((prev) => [...prev, newImage]);
      } catch (error) {
        console.error('Image upload error:', error);
        setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    },
    [afterImages.length, userId, uploadService],
  );

  const removeBeforeImage = useCallback((index: number) => {
    setBeforeImages((prev) => {
      const newImages = [...prev];
      // 미리보기 URL 해제
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  const removeAfterImage = useCallback((index: number) => {
    setAfterImages((prev) => {
      const newImages = [...prev];
      // 미리보기 URL 해제
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  const clearAllImages = useCallback(() => {
    // 모든 미리보기 URL 해제
    beforeImages.forEach((img) => URL.revokeObjectURL(img.preview));
    afterImages.forEach((img) => URL.revokeObjectURL(img.preview));

    setBeforeImages([]);
    setAfterImages([]);
    setUploadError(null);
  }, [beforeImages, afterImages]);

  return {
    beforeImages,
    afterImages,
    isUploading,
    uploadError,
    addBeforeImage,
    addAfterImage,
    removeBeforeImage,
    removeAfterImage,
    clearAllImages,
  };
}

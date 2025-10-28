import { createClient } from 'shared/lib/supabase/client';

export interface UploadImageParams {
  file: File;
  userId: string;
  type: 'BEFORE' | 'AFTER';
}

export interface UploadImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class ReviewImageUploadService {
  private readonly bucketName = 'kdoc-storage';
  private readonly maxFileSize = 10 * 1024 * 1024; // 10MB

  /**
   * 이미지를 Supabase Storage에 업로드
   */
  async uploadImage({ file, userId, type }: UploadImageParams): Promise<UploadImageResult> {
    try {
      // 파일 크기 검증
      if (file.size > this.maxFileSize) {
        return {
          success: false,
          error: 'File size exceeds 10MB limit',
        };
      }

      // 파일 확장자 추출
      const fileExt = file.name.split('.').pop();
      if (!fileExt) {
        return {
          success: false,
          error: 'Invalid file extension',
        };
      }

      // 파일명 생성: {userId}_{timestamp}_{uuid}.{ext}
      const timestamp = Date.now();
      const randomId = crypto.randomUUID();
      const fileName = `${userId}_${timestamp}_${randomId}.${fileExt}`;
      const filePath = `review-create/${type.toLowerCase()}/${fileName}`;

      // Supabase Storage에 업로드
      const supabase = createClient();
      const { data, error } = await supabase.storage.from(this.bucketName).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        console.error('Supabase upload error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      // Public URL 생성
      const {
        data: { publicUrl },
      } = supabase.storage.from(this.bucketName).getPublicUrl(data.path);

      return {
        success: true,
        url: publicUrl,
      };
    } catch (error) {
      console.error('Upload image error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 여러 이미지를 업로드
   */
  async uploadMultipleImages(params: UploadImageParams[]): Promise<UploadImageResult[]> {
    const uploadPromises = params.map((param) => this.uploadImage(param));
    return Promise.all(uploadPromises);
  }

  /**
   * 이미지 삭제
   */
  async deleteImage(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const supabase = createClient();
      const { error } = await supabase.storage.from(this.bucketName).remove([filePath]);

      if (error) {
        console.error('Supabase delete error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Delete image error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

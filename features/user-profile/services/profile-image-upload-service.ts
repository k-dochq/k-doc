import { createClient } from 'shared/lib/supabase/client';
import { STORAGE_CONFIG, STORAGE_PATHS } from 'shared/config/storage';

export interface UploadProfileImageParams {
  file: File;
  userId: string;
}

export interface UploadProfileImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class ProfileImageUploadService {
  private readonly bucketName = STORAGE_CONFIG.BUCKET_NAME;
  private readonly maxFileSize = STORAGE_CONFIG.MAX_FILE_SIZE;

  /**
   * 프로필 이미지를 Supabase Storage에 업로드
   */
  async uploadProfileImage({
    file,
    userId,
  }: UploadProfileImageParams): Promise<UploadProfileImageResult> {
    try {
      if (file.size > this.maxFileSize) {
        return {
          success: false,
          error: 'File size exceeds 10MB limit',
        };
      }

      const fileExt = file.name.split('.').pop();
      if (!fileExt) {
        return {
          success: false,
          error: 'Invalid file extension',
        };
      }

      const timestamp = Date.now();
      const randomId = crypto.randomUUID();
      const fileName = `${timestamp}_${randomId}.${fileExt}`;
      const filePath = `${STORAGE_PATHS.PROFILE_IMAGE}/${userId}/${fileName}`;

      const supabase = createClient();
      const { data, error } = await supabase.storage.from(this.bucketName).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        console.error('Supabase profile image upload error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(this.bucketName).getPublicUrl(data.path);

      return {
        success: true,
        url: publicUrl,
      };
    } catch (error) {
      console.error('Upload profile image error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

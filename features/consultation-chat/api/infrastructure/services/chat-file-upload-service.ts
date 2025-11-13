import { createClient } from 'shared/lib/supabase/client';
import { STORAGE_CONFIG, STORAGE_PATHS } from 'shared/config/storage';

export interface UploadChatFileParams {
  file: File;
  userId: string;
}

export interface UploadChatFileResult {
  success: boolean;
  url?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
}

export class ChatFileUploadService {
  private readonly bucketName = STORAGE_CONFIG.BUCKET_NAME;
  private readonly maxFileSize = STORAGE_CONFIG.MAX_FILE_SIZE;

  /**
   * 허용된 파일 타입 확인
   */
  private isAllowedFileType(file: File): boolean {
    const allowedTypes = [
      'application/pdf', // PDF
      'application/msword', // DOC
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'application/vnd.ms-excel', // XLS
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
      'text/plain', // TXT
    ];

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    return allowedTypes.includes(file.type) || allowedExtensions.some((ext) => fileExt === ext);
  }

  /**
   * 채팅 파일을 Supabase Storage에 업로드
   */
  async uploadFile({ file, userId }: UploadChatFileParams): Promise<UploadChatFileResult> {
    try {
      // 파일 타입 검증
      if (!this.isAllowedFileType(file)) {
        return {
          success: false,
          error:
            '지원하지 않는 파일 형식입니다. PDF, DOC, DOCX, XLS, XLSX, TXT 파일만 업로드 가능합니다.',
        };
      }

      // 파일 크기 검증
      if (file.size > this.maxFileSize) {
        return {
          success: false,
          error: '파일 크기는 10MB 이하여야 합니다.',
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
      const filePath = `${STORAGE_PATHS.CHAT_FILES}/${fileName}`;

      // Supabase Storage에 업로드
      const supabase = createClient();
      const { data, error } = await supabase.storage.from(this.bucketName).upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
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
        fileName: file.name,
        fileSize: file.size,
      };
    } catch (error) {
      console.error('Upload chat file error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 파일 삭제
   */
  async deleteFile(filePath: string): Promise<{ success: boolean; error?: string }> {
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
      console.error('Delete chat file error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

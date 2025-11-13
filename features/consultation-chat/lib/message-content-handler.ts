import { extractPictureTags, removePictureTags } from 'shared/lib/image-parser';
import { extractFileTags, removeFileTags, type FileData } from 'shared/lib/file-parser';

export interface MessageContentAnalysis {
  pictures: Array<{ url: string }>;
  files: FileData[];
  text: string;
  hasOnlyPictures: boolean;
  hasOnlyFiles: boolean;
}

/**
 * 메시지 내용을 분석하여 picture 태그, file 태그와 텍스트를 분리
 * 메시지는 다음 3가지 경우만 존재: 사진만, 파일만, 텍스트만
 */
export function analyzeMessageContent(content: string): MessageContentAnalysis {
  // 1. Picture 태그 추출 및 제거
  const pictures = extractPictureTags(content);
  const textWithoutPictures = removePictureTags(content);

  // 2. File 태그 추출 및 제거
  const files = extractFileTags(textWithoutPictures);
  const text = removeFileTags(textWithoutPictures);

  // 3. 플래그 계산 (3가지 경우만 존재)
  const hasOnlyPictures = pictures.length > 0 && files.length === 0 && !text.trim();
  const hasOnlyFiles = files.length > 0 && pictures.length === 0 && !text.trim();

  return {
    pictures,
    files,
    text,
    hasOnlyPictures,
    hasOnlyFiles,
  };
}

import { extractPictureTags, removePictureTags } from 'shared/lib/image-parser';
import { extractFileTags, removeFileTags, type FileData } from 'shared/lib/file-parser';

export interface MessageContentAnalysis {
  pictures: Array<{ url: string }>;
  files: FileData[];
  textWithoutPictures: string;
  textWithoutFiles: string;
  textWithoutMedia: string;
  hasOnlyPictures: boolean;
  hasOnlyFiles: boolean;
  hasOnlyMedia: boolean;
  hasText: boolean;
}

/**
 * 메시지 내용을 분석하여 picture 태그, file 태그와 텍스트를 분리
 */
export function analyzeMessageContent(content: string): MessageContentAnalysis {
  const pictures = extractPictureTags(content);
  const files = extractFileTags(content);

  // picture 태그 제거
  let textWithoutPictures = removePictureTags(content);
  // file 태그 제거
  let textWithoutFiles = removeFileTags(content);
  // 모든 미디어 태그 제거
  let textWithoutMedia = removeFileTags(removePictureTags(content));

  const hasText = !!textWithoutMedia.trim();
  const hasOnlyPictures = pictures.length > 0 && files.length === 0 && !hasText;
  const hasOnlyFiles = files.length > 0 && pictures.length === 0 && !hasText;
  const hasOnlyMedia = (pictures.length > 0 || files.length > 0) && !hasText;

  return {
    pictures,
    files,
    textWithoutPictures,
    textWithoutFiles,
    textWithoutMedia,
    hasOnlyPictures,
    hasOnlyFiles,
    hasOnlyMedia,
    hasText,
  };
}

import { extractPictureTags, removePictureTags } from 'shared/lib/image-parser';
import { extractFileTags, removeFileTags, type FileData } from 'shared/lib/file-parser';

export interface MessageContentAnalysis {
  pictures: Array<{ url: string }>;
  files: FileData[];
  text: string;
  hasOnlyPictures: boolean;
  hasOnlyFiles: boolean;
  hasEditor: boolean;
  editorContent?: string;
}

/**
 * <editor> 태그 추출
 */
export function extractEditorTag(content: string): string | null {
  const editorMatch = content.match(/<editor>(.*?)<\/editor>/s);
  return editorMatch ? editorMatch[1] : null;
}

/**
 * <editor> 태그 제거
 */
export function removeEditorTag(content: string): string {
  return content.replace(/<editor>.*?<\/editor>/s, '');
}

/**
 * 메시지 내용을 분석하여 picture 태그, file 태그, editor 태그와 텍스트를 분리
 */
export function analyzeMessageContent(content: string): MessageContentAnalysis {
  // 1. Editor 태그 추출 및 제거
  const editorContent = extractEditorTag(content);
  const hasEditor = editorContent !== null;
  const contentWithoutEditor = hasEditor ? removeEditorTag(content) : content;

  // 2. Picture 태그 추출 및 제거
  const pictures = extractPictureTags(contentWithoutEditor);
  const textWithoutPictures = removePictureTags(contentWithoutEditor);

  // 3. File 태그 추출 및 제거
  const files = extractFileTags(textWithoutPictures);
  const text = removeFileTags(textWithoutPictures);

  // 4. 플래그 계산
  const hasOnlyPictures = pictures.length > 0 && files.length === 0 && !text.trim();
  const hasOnlyFiles = files.length > 0 && pictures.length === 0 && !text.trim();

  return {
    pictures,
    files,
    text,
    hasOnlyPictures,
    hasOnlyFiles,
    hasEditor,
    editorContent: editorContent || undefined,
  };
}

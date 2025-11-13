import { type FileData } from './types';

/**
 * File tag 패턴: <file>{url}|{fileName}|{fileSize}</file>
 */
const FILE_TAG_REGEX = /<file>([^<]+)<\/file>/g;

/**
 * 파일 태그에서 데이터 파싱
 * @param content 파일 태그 내용 (url|fileName|fileSize 형식)
 * @returns FileData 또는 null
 */
function parseFileContent(content: string): FileData | null {
  const parts = content.split('|');
  if (parts.length !== 3) {
    return null;
  }

  const url = parts[0].trim();
  const fileName = parts[1].trim();
  const fileSize = parseInt(parts[2].trim(), 10);

  if (!url || !fileName || isNaN(fileSize)) {
    return null;
  }

  return {
    url,
    fileName,
    fileSize,
  };
}

/**
 * 메시지에서 file tag를 추출하고 파싱
 * @param message 메시지 내용
 * @returns file tag가 있으면 FileData 배열, 없으면 빈 배열
 */
export function extractFileTags(message: string): FileData[] {
  const matches = message.matchAll(FILE_TAG_REGEX);
  const files: FileData[] = [];

  for (const match of matches) {
    const content = match[1].trim();
    if (content) {
      const fileData = parseFileContent(content);
      if (fileData) {
        files.push(fileData);
      }
    }
  }

  return files;
}

/**
 * 메시지에서 file tag를 제거
 * @param message 메시지 내용
 * @returns file tag가 제거된 메시지
 */
export function removeFileTags(message: string): string {
  return message.replace(FILE_TAG_REGEX, '').trim();
}

/**
 * 메시지에 file tag가 있는지 확인
 * @param message 메시지 내용
 * @returns file tag가 있으면 true
 */
export function hasFileTag(message: string): boolean {
  return FILE_TAG_REGEX.test(message);
}

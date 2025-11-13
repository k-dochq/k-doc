/**
 * 파일 다운로드 유틸리티
 * Supabase Storage public URL에서 파일을 다운로드합니다.
 */

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 파일을 다운로드합니다.
 * @param url 파일 URL
 * @param fileName 다운로드할 파일명
 * @returns 다운로드 성공 여부
 */
export async function downloadFile(url: string, fileName: string): Promise<boolean> {
  try {
    // fetch로 파일 가져오기
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    // Blob으로 변환
    const blob = await response.blob();

    // Blob URL 생성
    const blobUrl = URL.createObjectURL(blob);

    // 다운로드 트리거
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // 정리
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    return true;
  } catch (error) {
    console.error('File download error:', error);
    return false;
  }
}

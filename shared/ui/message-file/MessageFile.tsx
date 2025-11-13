'use client';

import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { downloadFile, formatFileSize } from 'shared/lib/file-download';
import { type Dictionary } from 'shared/model/types';

interface MessageFileProps {
  url: string;
  fileName: string;
  fileSize: number;
  dict?: Dictionary;
}

export function MessageFile({ url, fileName, fileSize, dict }: MessageFileProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const errorMessage =
    dict?.consultation?.input?.fileDownloadError || '파일을 다운로드할 수 없습니다';
  const downloadButtonText = dict?.consultation?.input?.downloadButton || '다운로드';

  const handleDownload = async () => {
    setIsDownloading(true);
    setHasError(false);

    try {
      const success = await downloadFile(url, fileName);
      if (!success) {
        setHasError(true);
      }
    } catch (error) {
      console.error('Download error:', error);
      setHasError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  if (hasError) {
    return (
      <div className='flex h-[120px] w-full max-w-[280px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50'>
        <p className='text-sm text-gray-500'>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className='flex w-full max-w-[280px] flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4'>
      {/* 파일 아이콘 */}
      <div className='flex size-12 items-center justify-center rounded-lg bg-gray-100'>
        <FileText className='h-6 w-6 text-gray-600' />
      </div>

      {/* 파일명 */}
      <div className='w-full text-center'>
        <p className='truncate text-sm font-medium text-gray-900' title={fileName}>
          {fileName}
        </p>
        <p className='mt-1 text-xs text-gray-500'>{formatFileSize(fileSize)}</p>
      </div>

      {/* 다운로드 버튼 */}
      <button
        type='button'
        onClick={handleDownload}
        disabled={isDownloading}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-[#DA47EF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C83DD9] disabled:cursor-not-allowed disabled:opacity-50'
        aria-label={`${fileName} 다운로드`}
      >
        {isDownloading ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>다운로드 중...</span>
          </>
        ) : (
          <>
            <Download className='h-4 w-4' />
            <span>{downloadButtonText}</span>
          </>
        )}
      </button>
    </div>
  );
}

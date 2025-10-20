import React from 'react';

/**
 * 텍스트 내의 URL을 링크로 변환하는 유틸리티
 */

/**
 * URL 패턴을 감지하는 정규식
 */
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

/**
 * 텍스트 내의 URL을 <a> 태그로 변환
 * @param text 변환할 텍스트
 * @returns JSX 요소 배열
 */
export function parseUrlsToLinks(text: string): (string | React.ReactElement)[] {
  if (!text) return [text];

  const parts = text.split(URL_REGEX);

  return parts.map((part, index) => {
    // URL인지 확인
    if (URL_REGEX.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline hover:text-blue-800'
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

/**
 * 텍스트를 줄바꿈과 URL 링크를 모두 처리하여 JSX 요소로 변환
 * @param text 변환할 텍스트
 * @returns JSX 요소 배열
 */
export function parseTextWithLinks(text: string): (string | React.ReactElement)[] {
  if (!text) return [text];

  // 먼저 줄바꿈으로 분할
  const lines = text.split('\n');

  const result: (string | React.ReactElement)[] = [];

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      result.push('\n');
    }

    // 각 줄에서 URL을 링크로 변환
    const lineParts = parseUrlsToLinks(line);
    result.push(...lineParts);
  });

  return result;
}

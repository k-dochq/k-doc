import { Prisma } from '@prisma/client';

// 다국어 텍스트 타입
export type LocalizedText = {
  ko_KR?: string;
  en_US?: string;
  th_TH?: string;
};

// 공지사항 파일 타입
export type NoticeFileType = 'IMAGE' | 'ATTACHMENT';

// Prisma에서 생성된 타입 사용
export type Notice = Prisma.NoticeGetPayload<{}>;
export type NoticeFile = Prisma.NoticeFileGetPayload<{}>;

// 공지사항과 파일을 포함한 타입
export type NoticeWithFiles = Prisma.NoticeGetPayload<{
  include: {
    NoticeFile: true;
  };
}>;

// 공지사항 목록 조회 요청
export interface GetNoticesRequest {
  page: number;
  limit: number;
  isActive?: boolean;
}

// 공지사항 목록 조회 응답
export interface GetNoticesResponse {
  notices: NoticeWithFiles[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// 무한 스크롤용 파라미터
export interface UseInfiniteNoticesParams {
  limit?: number;
  isActive?: boolean;
}

// API 응답 타입
export interface NoticesApiResponse {
  success: boolean;
  data: GetNoticesResponse;
  error?: string;
}

// 단일 공지사항 조회 응답
export interface GetNoticeDetailResponse {
  success: boolean;
  data: NoticeWithFiles;
  error?: string;
}

// 유틸리티 함수들
export const parseJsonValueToLocalizedText = (value: Prisma.JsonValue): LocalizedText => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const textObj = value as LocalizedText;
    return {
      ko_KR: textObj.ko_KR || '',
      en_US: textObj.en_US || '',
      th_TH: textObj.th_TH || '',
    };
  }
  return { ko_KR: '', en_US: '', th_TH: '' };
};

export const parseLocalizedTextToJsonValue = (text: LocalizedText): Prisma.JsonValue => {
  return text;
};

export const getLocalizedTextValue = (
  value: Prisma.JsonValue,
  locale: keyof LocalizedText = 'ko_KR',
): string => {
  const localizedText = parseJsonValueToLocalizedText(value);
  return localizedText[locale] || '';
};

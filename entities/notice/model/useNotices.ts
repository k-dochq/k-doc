import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query-keys';
import type { Locale } from 'shared/config';
import type { GetNoticesResponse, NoticesApiResponse } from './types';

interface UseNoticesParams {
  page: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
  lang?: Locale;
}

// 공지사항 목록 조회 함수
async function fetchNotices({
  page,
  limit = 3,
  isActive = true,
  search,
  lang,
}: UseNoticesParams): Promise<GetNoticesResponse> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    isActive: isActive.toString(),
  });

  // 검색어가 있으면 추가
  if (search && search.trim()) {
    searchParams.set('search', search.trim());
  }

  // 언어가 있으면 추가
  if (lang) {
    searchParams.set('lang', lang);
  }

  const response = await fetch(`/api/notices?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('공지사항 목록을 불러오는데 실패했습니다.');
  }

  const result: NoticesApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || '공지사항 목록을 불러오는데 실패했습니다.');
  }

  return result.data;
}

// 페이지네이션 방식 공지사항 훅
export function useNotices(params: UseNoticesParams) {
  const filters = {
    page: params.page,
    limit: params.limit || 3,
    isActive: params.isActive ?? true,
    search: params.search,
    lang: params.lang,
  };

  return useQuery({
    queryKey: queryKeys.notices.list(filters),
    queryFn: () => fetchNotices(filters),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    placeholderData: (prev) => prev,
  });
}

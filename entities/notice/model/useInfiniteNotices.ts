import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/query-keys';
import type { GetNoticesResponse, NoticesApiResponse, UseInfiniteNoticesParams } from './types';

// 공지사항 목록 조회 함수
async function fetchNotices({
  pageParam = 1,
  limit = 5,
  isActive = true,
}: {
  pageParam: number;
} & UseInfiniteNoticesParams): Promise<GetNoticesResponse> {
  const searchParams = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    isActive: isActive.toString(),
  });

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

// 무한 스크롤 공지사항 훅
export function useInfiniteNotices(params: UseInfiniteNoticesParams = {}) {
  const filters = {
    limit: params.limit || 5,
    isActive: params.isActive ?? true,
  };

  return useInfiniteQuery({
    queryKey: queryKeys.notices.infinite(filters),
    queryFn: ({ pageParam }) => fetchNotices({ pageParam, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 있으면 현재 페이지 + 1, 없으면 undefined
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

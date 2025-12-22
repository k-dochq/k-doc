import { useQuery } from '@tanstack/react-query';
import { type NoticeWithFiles, type GetNoticeDetailResponse } from './types';

// 단일 공지사항 조회 함수 (이전/다음글 포함)
async function fetchNoticeDetail(id: string): Promise<
  NoticeWithFiles & {
    previousNotice: { id: string; title: any } | null;
    nextNotice: { id: string; title: any } | null;
  }
> {
  const response = await fetch(`/api/notices/${id}`);

  if (!response.ok) {
    throw new Error('공지사항을 불러오는데 실패했습니다.');
  }

  const result: GetNoticeDetailResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || '공지사항을 불러오는데 실패했습니다.');
  }

  return result.data;
}

// 공지사항 상세 조회 훅
export function useNoticeDetail(id: string) {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: () => fetchNoticeDetail(id),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!id, // id가 있을 때만 실행
  });
}

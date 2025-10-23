import { useSuspenseQuery } from '@tanstack/react-query';
import { type NoticeWithFiles, type GetNoticeDetailResponse } from './types';

// 단일 공지사항 조회 함수
async function fetchNoticeDetail(id: string): Promise<NoticeWithFiles> {
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
  return useSuspenseQuery({
    queryKey: ['notice', id],
    queryFn: () => fetchNoticeDetail(id),
    staleTime: 5 * 60 * 1000, // 5분
  });
}

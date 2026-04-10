'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import { type TipArticle, type TipsSortOption } from './useInfiniteTips';

interface TipsResponse {
  articles: TipArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  currentPage: number;
}

interface TipsApiResponse {
  success: boolean;
  data: TipsResponse;
  error?: string;
}

async function fetchTipsList({
  limit,
  sort,
}: {
  limit: number;
  sort: TipsSortOption;
}): Promise<TipArticle[]> {
  const params = new URLSearchParams({
    page: '1',
    limit: limit.toString(),
    sort,
  });
  const response = await fetch(`/api/tips?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result: TipsApiResponse = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch tips');
  }
  return result.data.articles;
}

interface UseTipsListParams {
  limit?: number;
  sort?: TipsSortOption;
}

export function useTipsList({ limit = 3, sort = 'latest' }: UseTipsListParams = {}) {
  return useQuery({
    queryKey: queryKeys.tips.infinite({ limit, sort, mode: 'list' }),
    queryFn: () => fetchTipsList({ limit, sort }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

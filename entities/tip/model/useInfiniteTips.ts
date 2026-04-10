'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { type Prisma } from '@prisma/client';
import { queryKeys } from 'shared/lib/query-keys';

export type TipArticle = Prisma.InsightArticleGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    excerpt: true;
    coverImage: true;
    hashtags: true;
    medicalSpecialtyIds: true;
    viewCount: true;
    publishedAt: true;
  };
}>;

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

async function fetchTips({
  pageParam = 1,
  limit = 10,
}: {
  pageParam: number;
  limit?: number;
}): Promise<TipsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/tips?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: TipsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch tips');
  }

  return result.data;
}

interface UseInfiniteTipsParams {
  limit?: number;
}

export function useInfiniteTips({ limit = 10 }: UseInfiniteTipsParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.tips.infinite({ limit }),
    queryFn: ({ pageParam }) => fetchTips({ pageParam, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

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
    hashtagsI18n: true;
    medicalSpecialtyIds: true;
    viewCount: true;
    publishedAt: true;
  };
}> & {
  medicalSpecialties: { id: string; name: Prisma.JsonValue }[];
};

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

export type TipsSortOption = 'latest' | 'popular';

async function fetchTips({
  pageParam = 1,
  limit = 10,
  sort = 'latest',
}: {
  pageParam: number;
  limit?: number;
  sort?: TipsSortOption;
}): Promise<TipsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
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

  return result.data;
}

interface UseInfiniteTipsParams {
  limit?: number;
  sort?: TipsSortOption;
}

export function useInfiniteTips({ limit = 10, sort = 'latest' }: UseInfiniteTipsParams = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.tips.infinite({ limit, sort }),
    queryFn: ({ pageParam }) => fetchTips({ pageParam, limit, sort }),
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

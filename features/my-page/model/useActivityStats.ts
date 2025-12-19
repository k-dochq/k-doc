'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

export interface ActivityStats {
  myPostsCount: number;
  consultationChatCount: number;
}

interface ActivityStatsResponse {
  success: boolean;
  data?: ActivityStats;
  error?: string;
  requestId?: string;
}

async function fetchActivityStats(): Promise<ActivityStats> {
  const response = await fetch('/api/my/activity-stats');

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Login required');
    }
    throw new Error('Failed to fetch activity stats');
  }

  const result: ActivityStatsResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch activity stats');
  }

  return result.data;
}

export function useActivityStats() {
  return useQuery({
    queryKey: queryKeys.my.activityStats(),
    queryFn: fetchActivityStats,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      // 401 에러는 재시도하지 않음
      if (error instanceof Error && error.message.includes('Login required')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

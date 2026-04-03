'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';
import type { InfluencerVideoPlatform } from '@prisma/client';

export interface InfluencerVideoItem {
  id: string;
  platform: InfluencerVideoPlatform;
  handle: string;
  videoUrl: string;
  externalLink: string;
  title: Record<string, string>;
}

async function fetchInfluencerVideos(): Promise<InfluencerVideoItem[]> {
  const response = await fetch('/api/influencer-videos');
  if (!response.ok) throw new Error('Failed to fetch influencer videos');
  const result = await response.json();
  return result.data ?? [];
}

export function useInfluencerVideos() {
  return useQuery<InfluencerVideoItem[]>({
    queryKey: queryKeys.influencerVideos.list(),
    queryFn: fetchInfluencerVideos,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

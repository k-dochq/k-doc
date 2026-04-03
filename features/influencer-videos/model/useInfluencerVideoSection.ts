'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'shared/lib/query-keys';

export interface InfluencerVideoSectionData {
  buttonLabel: Record<string, string>;
  buttonUrl: Record<string, string>;
}

async function fetchInfluencerVideoSection(): Promise<InfluencerVideoSectionData | null> {
  const response = await fetch('/api/influencer-video-section');
  if (!response.ok) throw new Error('Failed to fetch influencer video section');
  const result = await response.json();
  return result.data ?? null;
}

export function useInfluencerVideoSection() {
  return useQuery<InfluencerVideoSectionData | null>({
    queryKey: queryKeys.influencerVideos.section(),
    queryFn: fetchInfluencerVideoSection,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

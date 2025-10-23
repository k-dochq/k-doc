'use client';

import { useQuery } from '@tanstack/react-query';
import { type EventBannerWithImages } from 'widgets/event-banner/model/types';

export interface GetActiveBannersResponse {
  success: boolean;
  data: EventBannerWithImages[];
}

export async function fetchActiveBanners(): Promise<EventBannerWithImages[]> {
  const response = await fetch('/api/banners/active');

  if (!response.ok) {
    throw new Error('Failed to fetch active banners');
  }

  const result: GetActiveBannersResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch active banners');
  }

  return result.data;
}

export function useActiveBanners() {
  return useQuery({
    queryKey: ['active-banners'],
    queryFn: fetchActiveBanners,
    staleTime: 15 * 60 * 1000, // 15분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { type EventBannerWithImages } from 'widgets/event-banner/model/types';
import { type EventBannerType } from '@prisma/client';

export interface GetActiveBannersResponse {
  success: boolean;
  data: EventBannerWithImages[];
}

export interface FetchActiveBannersOptions {
  type?: EventBannerType;
}

export async function fetchActiveBanners(
  options?: FetchActiveBannersOptions,
): Promise<EventBannerWithImages[]> {
  const params = new URLSearchParams();
  if (options?.type) {
    params.append('type', options.type);
  }

  const url = `/api/banners/active${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch active banners');
  }

  const result: GetActiveBannersResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch active banners');
  }

  return result.data;
}

export interface UseActiveBannersOptions {
  type?: EventBannerType;
}

export function useActiveBanners(options?: UseActiveBannersOptions) {
  return useQuery({
    queryKey: ['active-banners', options?.type],
    queryFn: () => fetchActiveBanners(options),
    staleTime: 30 * 60 * 1000, // 30분
    gcTime: 60 * 60 * 1000, // 60분
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

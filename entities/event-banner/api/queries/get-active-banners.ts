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
    staleTime: 2 * 60 * 60 * 1000, // 2시간 - 데이터가 오래된 것으로 간주되기 전까지의 시간
    gcTime: 24 * 60 * 60 * 1000, // 24시간 - 캐시에서 제거되기 전까지의 시간
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// v2: 전체 배너 조회 (active만이 아닌 모든 배너)
export interface FetchAllBannersOptions {
  type?: EventBannerType;
}

export async function fetchAllBanners(
  options?: FetchAllBannersOptions,
): Promise<EventBannerWithImages[]> {
  const params = new URLSearchParams();
  if (options?.type) {
    params.append('type', options.type);
  }

  const url = `/api/banners${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch banners');
  }

  const result: GetActiveBannersResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch banners');
  }

  return result.data;
}

export interface UseAllBannersOptions {
  type?: EventBannerType;
}

export function useAllBanners(options?: UseAllBannersOptions) {
  return useQuery({
    queryKey: ['banners', options?.type],
    queryFn: () => fetchAllBanners(options),
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

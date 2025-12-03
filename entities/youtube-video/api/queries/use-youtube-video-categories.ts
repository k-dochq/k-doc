'use client';

import { useQuery } from '@tanstack/react-query';
import { getYoutubeVideoCategories } from '../use-cases/get-youtube-video-categories';

export function useYoutubeVideoCategories() {
  return useQuery({
    queryKey: ['youtube-video-categories'],
    queryFn: () => getYoutubeVideoCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

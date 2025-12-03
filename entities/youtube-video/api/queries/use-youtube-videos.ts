'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchYoutubeVideos, type GetYoutubeVideosParams } from './get-youtube-videos';

export function useYoutubeVideos(params: GetYoutubeVideosParams = {}) {
  return useQuery({
    queryKey: ['youtube-videos', params.categoryId, params.limit],
    queryFn: () => fetchYoutubeVideos(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

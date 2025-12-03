'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useYoutubeVideos } from 'entities/youtube-video';
import { YoutubeVideosCarouselV2 } from './YoutubeVideosCarouselV2';
import { YoutubeVideosCarouselV2Skeleton } from './YoutubeVideosCarouselV2Skeleton';

interface YoutubeVideosCarouselV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
  selectedCategory: string | null;
}

function YoutubeVideosCarouselV2Content({
  lang,
  dict,
  selectedCategory,
}: YoutubeVideosCarouselV2WrapperProps) {
  const {
    data: videosData,
    isLoading,
    error,
  } = useYoutubeVideos({
    categoryId: selectedCategory || undefined,
    limit: 10,
  });

  if (isLoading) {
    return <YoutubeVideosCarouselV2Skeleton />;
  }

  if (error) {
    return null; // Error UI는 다음 작업에서 구현
  }

  if (!videosData || videosData.videos.length === 0) {
    return <div className='py-8 text-center text-gray-500'>{dict.youtube.empty.message}</div>;
  }

  return <YoutubeVideosCarouselV2 videos={videosData.videos} lang={lang} dict={dict} />;
}

export function YoutubeVideosCarouselV2Wrapper({
  lang,
  dict,
  selectedCategory,
}: YoutubeVideosCarouselV2WrapperProps) {
  return (
    <Suspense fallback={<YoutubeVideosCarouselV2Skeleton />}>
      <YoutubeVideosCarouselV2Content lang={lang} dict={dict} selectedCategory={selectedCategory} />
    </Suspense>
  );
}

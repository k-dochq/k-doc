'use client';

import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useYoutubeVideos } from 'entities/youtube-video';

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
    return null; // Skeleton은 다음 작업에서 구현
  }

  if (error) {
    return null; // Error UI는 다음 작업에서 구현
  }

  if (!videosData || videosData.videos.length === 0) {
    return <div className='py-8 text-center text-gray-500'>{dict.youtube.empty.message}</div>;
  }

  // 영상 리스트 carousel은 다음 작업에서 구현
  return null;
}

export function YoutubeVideosCarouselV2Wrapper({
  lang,
  dict,
  selectedCategory,
}: YoutubeVideosCarouselV2WrapperProps) {
  return (
    <Suspense fallback={null}>
      <YoutubeVideosCarouselV2Content lang={lang} dict={dict} selectedCategory={selectedCategory} />
    </Suspense>
  );
}

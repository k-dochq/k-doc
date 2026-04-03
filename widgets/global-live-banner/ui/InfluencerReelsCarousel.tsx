'use client';

import { type Locale } from 'shared/config';
import { useInfluencerVideos } from 'features/influencer-videos';
import { InfluencerVideoReelCard } from 'entities/influencer-video';
import { useReelsCarousel } from '../model/useReelsCarousel';

interface InfluencerReelsCarouselProps {
  lang: Locale;
}

export function InfluencerReelsCarousel({ lang }: InfluencerReelsCarouselProps) {
  const { data: videos } = useInfluencerVideos();
  const { scrollRef, handlers } = useReelsCarousel(lang);

  if (!videos || videos.length === 0) return null;

  // Duplicate cards for seamless infinite loop
  const loopedVideos = [...videos, ...videos];

  return (
    <div className='mt-6 w-full relative' dir='ltr'>
      <div
        ref={scrollRef}
        className='overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing'
        style={{ scrollbarWidth: 'none' }}
        {...handlers}
      >
        <div className='flex gap-3 w-max select-none'>
          {loopedVideos.map((video, i) => (
            <InfluencerVideoReelCard key={`${video.id}-${i}`} video={video} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

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
  const { outerRef, innerRef, handlers } = useReelsCarousel(lang);

  if (!videos || videos.length === 0) return null;

  // Duplicate cards for seamless infinite loop
  const loopedVideos = [...videos, ...videos];

  return (
    <div className='mt-6 w-full overflow-hidden cursor-grab active:cursor-grabbing' ref={outerRef} dir='ltr' {...handlers}>
      <div ref={innerRef} className='flex gap-3 w-max select-none will-change-transform'>
        {loopedVideos.map((video, i) => (
          <InfluencerVideoReelCard key={`${video.id}-${i}`} video={video} lang={lang} />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type InfluencerVideoItem } from 'features/influencer-videos';
import { maskHandle, getLocalizedTitle } from '../lib/format';
import { PLATFORM_META } from './platform-icons';

interface InfluencerVideoReelCardProps {
  video: InfluencerVideoItem;
  lang: Locale;
  carouselRef: React.RefObject<HTMLDivElement | null>;
}

export function InfluencerVideoReelCard({ video, lang, carouselRef }: InfluencerVideoReelCardProps) {
  const platform = PLATFORM_META[video.platform] ?? PLATFORM_META.INSTAGRAM;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { root: carouselRef.current, threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [carouselRef]);

  return (
    <div
      className='relative flex-shrink-0 w-[180px] rounded-xl overflow-hidden bg-black'
      style={{ aspectRatio: '9/16' }}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className='w-full h-full object-cover pointer-events-none'
        muted
        loop
        playsInline
        preload='auto'
      />

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30' />

      {/* Platform badge */}
      <div
        className={`absolute top-3 z-10 flex items-center gap-0.5 rounded-full bg-[rgba(64,64,64,0.8)] px-2 py-1 backdrop-blur-[2px] ${lang === 'ar' ? 'right-3' : 'left-3'}`}
      >
        {platform.icon}
        <span className='text-xs font-semibold leading-4 text-white'>{platform.label}</span>
      </div>

      {/* Bottom overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 z-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
      >
        <p className='text-base font-semibold leading-6 text-white'>
          {getLocalizedTitle(video.title, lang)}
        </p>
        <p className='text-[13px] font-medium leading-[19px] text-[#E5E5E5]'>
          {maskHandle(video.handle)}
        </p>
      </div>
    </div>
  );
}

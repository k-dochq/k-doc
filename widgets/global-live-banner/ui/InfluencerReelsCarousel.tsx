'use client';

import { useRef, useEffect, useCallback } from 'react';
import { type Locale } from 'shared/config';
import { useInfluencerVideos, type InfluencerVideoItem } from 'features/influencer-videos';

interface InfluencerReelsCarouselProps {
  lang: Locale;
}

function maskHandle(handle: string): string {
  return `@${handle.slice(0, 5)}***`;
}

function getLocalizedTitle(title: Record<string, string>, lang: Locale): string {
  const key = lang === 'zh-Hant' ? 'zh' : lang;
  return title[key] || title['en'] || '';
}

const InstagramIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
    <path
      d='M11.3333 2H4.66667C3.19391 2 2 3.19391 2 4.66667V11.3333C2 12.8061 3.19391 14 4.66667 14H11.3333C12.8061 14 14 12.8061 14 11.3333V4.66667C14 3.19391 12.8061 2 11.3333 2Z'
      stroke='white'
      strokeLinejoin='round'
    />
    <path
      d='M8.0026 10.6673C9.47537 10.6673 10.6693 9.47342 10.6693 8.00065C10.6693 6.52788 9.47537 5.33398 8.0026 5.33398C6.52984 5.33398 5.33594 6.52788 5.33594 8.00065C5.33594 9.47342 6.52984 10.6673 8.0026 10.6673Z'
      stroke='white'
      strokeLinejoin='round'
    />
    <path
      d='M11.6667 4.99935C12.0349 4.99935 12.3333 4.70088 12.3333 4.33268C12.3333 3.96448 12.0349 3.66602 11.6667 3.66602C11.2985 3.66602 11 3.96448 11 4.33268C11 4.70088 11.2985 4.99935 11.6667 4.99935Z'
      fill='white'
    />
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
    <path
      d='M3.53145 3.31298C5.44505 3.2176 6.93341 3.16992 7.99656 3.16992C9.05986 3.16992 10.5488 3.21763 12.4633 3.31301C13.4997 3.36466 14.3379 4.17515 14.4243 5.20917C14.5119 6.25656 14.5556 7.17904 14.5556 7.97662C14.5556 8.78401 14.5108 9.71934 14.4211 10.7827C14.3349 11.8038 13.5149 12.6085 12.4923 12.6754C10.8555 12.7824 9.35692 12.8359 7.99656 12.8359C6.63642 12.8359 5.13839 12.7824 3.50249 12.6754C2.48021 12.6086 1.66039 11.8044 1.5738 10.7836C1.48293 9.71236 1.4375 8.77669 1.4375 7.97662C1.4375 7.18619 1.48185 6.26339 1.57055 5.20821C1.65743 4.1746 2.49548 3.36462 3.53145 3.31298Z'
      stroke='white'
      strokeLinejoin='round'
    />
    <path
      d='M6.96094 6.48539V9.52218C6.96094 9.6856 7.09343 9.81806 7.25682 9.81806C7.31485 9.81806 7.3716 9.80101 7.42 9.76904L9.69759 8.2637C9.83392 8.17359 9.87138 7.99001 9.78127 7.85368C9.75973 7.82109 9.73194 7.7931 9.69953 7.77128L7.42194 6.23984C7.28634 6.14863 7.10248 6.18467 7.01127 6.32027C6.97847 6.36909 6.96094 6.42657 6.96094 6.48539Z'
      fill='white'
      stroke='white'
      strokeLinejoin='round'
    />
  </svg>
);

const TiktokIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
    <path
      d='M7.12031 6.38021C5.15744 6.28551 3.79304 6.98534 3.0271 8.47971C1.87821 10.7212 2.82773 14.3891 6.66058 14.3891C10.4934 14.3891 10.6043 10.6854 10.6043 10.2974C10.6043 10.0387 10.6043 8.59238 10.6043 5.95844C11.4241 6.47768 12.1153 6.79024 12.6779 6.89614C13.2405 7.00201 13.5981 7.04894 13.7509 7.03691V4.87834C13.2305 4.81561 12.7805 4.69601 12.4009 4.51961C11.8314 4.25501 10.7022 3.52061 10.7022 2.44427C10.703 2.44953 10.703 2.17189 10.7022 1.61133H8.32954C8.32248 6.88334 8.32248 9.77868 8.32954 10.2974C8.34014 11.0754 7.73658 12.1637 6.51281 12.1637C5.28904 12.1637 4.68548 11.0763 4.68548 10.3749C4.68548 9.94548 4.83298 9.32308 5.44268 8.86218C5.80424 8.58884 6.30608 8.47971 7.12031 8.47971C7.12031 8.22784 7.12031 7.52801 7.12031 6.38021Z'
      fill='white'
    />
  </svg>
);

const PLATFORM_META = {
  INSTAGRAM: { icon: <InstagramIcon />, label: 'Instagram' },
  YOUTUBE: { icon: <YoutubeIcon />, label: 'YouTube' },
  TIKTOK: { icon: <TiktokIcon />, label: 'TikTok' },
} as const;

function ReelCard({ video, lang }: { video: InfluencerVideoItem; lang: Locale }) {
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
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      <div className={`absolute bottom-0 left-0 right-0 p-4 z-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
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

// px per millisecond — at 60fps (16.67ms/frame) ≈ 0.8px/frame, same as before
const SCROLL_SPEED_PX_PER_MS = 0.048;

export function InfluencerReelsCarousel({ lang }: InfluencerReelsCarouselProps) {
  const { data: videos } = useInfluencerVideos();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const rafId = useRef<number>(0);
  const isPaused = useRef(false);
  const lastTimestamp = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    const el = scrollRef.current;
    if (!el) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    if (!isPaused.current && lastTimestamp.current !== 0) {
      // Cap delta to 50ms to prevent large jumps after tab switching
      const delta = Math.min(timestamp - lastTimestamp.current, 50);

      // Infinite loop: reset to first half when reaching second half
      const halfWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }

      const direction = lang === 'ar' ? -1 : 1;
      el.scrollLeft += SCROLL_SPEED_PX_PER_MS * delta * direction;
    }

    lastTimestamp.current = timestamp;
    rafId.current = requestAnimationFrame(animate);
  }, [lang]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeftStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const delta = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeftStart.current - delta;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    isPaused.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeftStart.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const delta = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeftStart.current - delta;
  };

  const onTouchEnd = () => {
    isPaused.current = false;
  };

  if (!videos || videos.length === 0) return null;

  // Duplicate cards for seamless infinite loop
  const loopedVideos = [...videos, ...videos];

  return (
    <div className='mt-6 w-full relative' dir='ltr'>
      <div
        ref={scrollRef}
        className='overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing'
        style={{ scrollbarWidth: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className='flex gap-3 w-max select-none'>
          {loopedVideos.map((video, i) => (
            <ReelCard key={`${video.id}-${i}`} video={video} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

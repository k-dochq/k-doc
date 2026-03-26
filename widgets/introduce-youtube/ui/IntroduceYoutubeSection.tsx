'use client';

/// <reference types="youtube" />

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { getIntroduceVideoId } from '../lib/get-introduce-video-id';
import { loadYouTubeIframeAPI } from 'shared/lib/youtube-iframe-api';
import { IntroduceYoutubePlayIcon } from './IntroduceYoutubePlayIcon';

function getThumbnailSrc(lang: Locale): string {
  if (lang === 'ja') return '/images/main/video_thum_ja.png';
  if (lang === 'zh-Hant') return '/images/main/video_thum_zh.png';
  return '/images/main/video_thum_en.png';
}

interface IntroduceYoutubeSectionProps {
  lang: Locale;
}

export function IntroduceYoutubeSection({ lang }: IntroduceYoutubeSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const isPlayerReadyRef = useRef(false);

  const videoId = getIntroduceVideoId(lang);
  const thumbnailSrc = getThumbnailSrc(lang);

  useEffect(() => {
    let destroyed = false;

    loadYouTubeIframeAPI().then(() => {
      if (destroyed || !playerContainerRef.current) return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            if (!destroyed) isPlayerReadyRef.current = true;
          },
        },
      });
    });

    return () => {
      destroyed = true;
      isPlayerReadyRef.current = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (isPlayerReadyRef.current && playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className='relative aspect-[500/279] w-full overflow-hidden'>
      {/* 플레이어는 항상 렌더링 (display:none 금지 — YT.Player 초기화 실패 원인) */}
      <div ref={playerContainerRef} className='absolute inset-0 h-full w-full' />
      {/* 재생 전: 썸네일이 플레이어 위를 덮음 */}
      {!isPlaying && (
        <button
          type='button'
          onClick={handlePlay}
          className='absolute inset-0 z-10 cursor-pointer border-0 p-0'
          aria-label='Play introduction video'
        >
          <Image
            src={thumbnailSrc}
            alt='Introduction video thumbnail'
            fill
            sizes='100vw'
            className='object-cover object-center'
            priority
          />
          <span className='absolute inset-0 flex items-center justify-center'>
            <IntroduceYoutubePlayIcon />
          </span>
        </button>
      )}
    </div>
  );
}

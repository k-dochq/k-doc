'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { getIntroduceEmbedUrl } from '../lib/get-introduce-video-id';
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

  const embedUrl = getIntroduceEmbedUrl(lang);
  const embedUrlWithAutoplay = `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`;
  const thumbnailSrc = getThumbnailSrc(lang);

  return (
    <div className='relative aspect-[500/279] w-full overflow-hidden'>
      {!isPlaying ? (
        <button
          type='button'
          onClick={() => setIsPlaying(true)}
          className='absolute inset-0 cursor-pointer border-0 p-0'
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
      ) : (
        <iframe
          src={embedUrlWithAutoplay}
          title='YouTube introduction video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          className='absolute inset-0 h-full w-full'
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Locale } from 'shared/config';
import { getIntroduceEmbedUrl } from '../lib/get-introduce-video-id';
import { IntroduceYoutubePlayIcon } from './IntroduceYoutubePlayIcon';

const THUMBNAIL_SRC = '/images/main/introduce_thumbnail.png';

interface IntroduceYoutubeSectionProps {
  lang: Locale;
}

export function IntroduceYoutubeSection({ lang }: IntroduceYoutubeSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const embedUrl = getIntroduceEmbedUrl(lang);
  const embedUrlWithAutoplay = `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`;

  const handleThumbnailClick = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className='relative aspect-[375/212] w-full overflow-hidden'>
      {!isPlaying ? (
        <button
          type='button'
          onClick={handleThumbnailClick}
          className='relative h-full w-full cursor-pointer border-0 p-0 text-left'
          aria-label='Play introduction video'
        >
          <Image
            src={THUMBNAIL_SRC}
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
        <div className='relative h-full w-full'>
          {isLoading && (
            <div className='absolute inset-0 z-10 flex items-center justify-center bg-gray-900'>
              <div className='h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-white' />
            </div>
          )}
          <iframe
            width='100%'
            height='100%'
            src={embedUrlWithAutoplay}
            title='YouTube introduction video'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            className='absolute inset-0 h-full w-full'
            onLoad={handleIframeLoad}
          />
        </div>
      )}
    </div>
  );
}

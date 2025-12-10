'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { YoutubeVideoEmbedPlayer } from 'entities/youtube-video';
import { useHospitalVideos } from 'entities/hospital/model/useHospitalVideos';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalDetailProceduresVideoSectionProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailProceduresVideoSection({
  hospitalId,
  lang,
  dict,
}: HospitalDetailProceduresVideoSectionProps) {
  const { data, isLoading, error } = useHospitalVideos(hospitalId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);

  if (isLoading) {
    return null;
  }

  // 선택된 언어에 맞는 썸네일 URL 추출
  const thumbnailUrl =
    extractLocalizedText(data?.thumbnail?.localizedLinks ?? null, lang) ||
    data?.thumbnail?.fallbackUrl ||
    null;

  // 선택된 언어에 맞는 영상 URL 추출
  const videoUrl =
    extractLocalizedText(data?.video?.localizedLinks ?? null, lang) ||
    data?.video?.fallbackUrl ||
    null;

  const thumbnailAlt = data?.thumbnail?.alt || dict.hospitalDetailTabs.youtube;

  const hasVideoData = !!thumbnailUrl && !!videoUrl;

  const handlePlay = () => {
    setIsPlayerLoading(true);
    setIsPlaying(true);
  };

  return (
    <div className='flex flex-col space-y-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospitalDetailTabs.youtube}
      </h2>

      {!hasVideoData || error ? (
        <p className='text-sm leading-5 text-neutral-500'>
          {dict.hospitalDetailTabs.youtubePreparing}
        </p>
      ) : (
        <div className='relative h-[188px] w-full overflow-hidden rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'>
          {!isPlaying ? (
            <button
              type='button'
              onClick={handlePlay}
              className='relative block h-full w-full cursor-pointer'
              aria-label={dict.hospitalDetailTabs.youtube}
            >
              <Image
                src={thumbnailUrl || DEFAULT_IMAGES.HOSPITAL_DEFAULT}
                alt={thumbnailAlt || 'youtube thumbnail'}
                fill
                sizes='100%'
                className='absolute inset-0 max-w-none object-cover object-center'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DEFAULT_IMAGES.HOSPITAL_DEFAULT;
                }}
              />
            </button>
          ) : (
            <YoutubeVideoEmbedPlayer
              videoUrl={videoUrl}
              title={dict.hospitalDetailTabs.youtube}
              isLoading={isPlayerLoading}
              onLoad={() => setIsPlayerLoading(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

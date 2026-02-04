'use client';

import Image from 'next/image';
import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { localeToAltValue } from 'shared/lib/localized-text';
import { YoutubeVideoEmbedPlayer } from 'entities/youtube-video';
import { useHospitalVideos } from 'entities/hospital/model/useHospitalVideos';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalDetailProceduresVideoSectionProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * localizedLinks에서 현재 언어에 맞는 URL을 가져오는 헬퍼 함수
 */
function getLocalizedVideoUrl(
  localizedLinks: Record<string, string> | null,
  fallbackUrl: string | null,
  locale: Locale,
): string | null {
  const altValue = localeToAltValue(locale);

  if (localizedLinks && typeof localizedLinks === 'object') {
    // localizedLinks에서 현재 언어에 맞는 URL 찾기
    const localizedUrl = localizedLinks[altValue];
    if (localizedUrl && typeof localizedUrl === 'string' && localizedUrl.trim() !== '') {
      return localizedUrl;
    }
  }

  // localizedLinks가 없거나 현재 언어가 없으면 fallback 사용
  return fallbackUrl;
}

/**
 * title(Json)에서 현재 언어에 맞는 제목 문자열을 가져오는 헬퍼 함수
 */
function getLocalizedVideoTitle(
  title: Record<string, string> | null,
  locale: Locale,
): string | null {
  if (!title || typeof title !== 'object') return null;
  const altValue = localeToAltValue(locale);
  const value = title[altValue];
  if (typeof value === 'string' && value.trim() !== '') return value.trim();
  return null;
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

  // localizedLinks에서 현재 언어에 맞는 URL 가져오기
  const thumbnailUrl = getLocalizedVideoUrl(
    data?.thumbnail?.localizedLinks as Record<string, string> | null,
    data?.thumbnail?.fallbackUrl || null,
    lang,
  );

  const videoUrl = getLocalizedVideoUrl(
    data?.video?.localizedLinks as Record<string, string> | null,
    data?.video?.fallbackUrl || null,
    lang,
  );

  const thumbnailAlt = data?.thumbnail?.alt || dict.hospitalDetailTabs.youtube;

  const videoTitle = getLocalizedVideoTitle(
    (data?.video?.title as Record<string, string> | null) ?? null,
    lang,
  );

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
        <>
          <div className='relative aspect-[335/188] w-full overflow-hidden rounded-xl'>
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
          {videoTitle && <p className='text-base font-semibold text-neutral-700'>{videoTitle}</p>}
        </>
      )}
    </div>
  );
}

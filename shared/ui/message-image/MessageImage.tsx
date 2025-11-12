'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type Dictionary } from 'shared/model/types';

interface MessageImageProps {
  url: string;
  alt?: string;
  dict?: Dictionary;
}

export function MessageImage({ url, alt = 'Uploaded image', dict }: MessageImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const errorMessage = dict?.consultation?.input?.imageLoadError || '이미지를 불러올 수 없습니다';

  if (hasError) {
    return (
      <div className='flex h-[200px] w-full max-w-[280px] items-center justify-center rounded-xl'>
        <p className='text-sm text-gray-500'>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className='relative w-full max-w-[280px] overflow-hidden rounded-xl'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#DA47EF]' />
        </div>
      )}
      <Image
        src={url}
        alt={alt}
        width={280}
        height={280}
        className='h-auto w-full rounded-xl object-cover'
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        unoptimized
      />
    </div>
  );
}

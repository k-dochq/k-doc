'use client';

import { DEFAULT_IMAGES } from 'shared/config/images';

interface ChatRoomThumbnailProps {
  thumbnailUrl?: string;
  hospitalName: string;
}

export function ChatRoomThumbnail({ thumbnailUrl, hospitalName }: ChatRoomThumbnailProps) {
  return (
    <div className='h-[100px] w-[100px] flex-shrink-0'>
      <div className='relative h-full w-full overflow-hidden rounded-xl'>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={hospitalName}
            className='h-full w-full object-cover'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_IMAGES.HOSPITAL_DEFAULT;
            }}
          />
        ) : (
          <img
            src={DEFAULT_IMAGES.HOSPITAL_DEFAULT}
            alt={hospitalName}
            className='h-full w-full object-cover'
          />
        )}
      </div>
    </div>
  );
}

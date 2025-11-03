'use client';

import { LocaleLink } from 'shared/ui/locale-link';
import { type Prisma } from '@prisma/client';
import { getLocalizedTitle } from '../model/types';

export interface EventBannerItemProps {
  id: string;
  title: Prisma.JsonValue;
  linkUrl: string | null;
  imageUrl: string;
  alt: string | null;
  currentLocale: 'ko' | 'en' | 'th';
}

export function EventBannerItem({
  linkUrl,
  imageUrl,
  alt,
  title,
  currentLocale,
}: EventBannerItemProps) {
  const localizedTitle = getLocalizedTitle(title, currentLocale);
  const imageAlt = alt || localizedTitle || 'Event Banner';

  if (linkUrl) {
    return (
      <LocaleLink href={linkUrl} className='block'>
        <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
          <img src={imageUrl} alt={imageAlt} className='h-full w-full object-cover' />
        </div>
      </LocaleLink>
    );
  }

  return (
    <div className='block'>
      <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
        <img src={imageUrl} alt={imageAlt} className='h-full w-full object-cover' />
      </div>
    </div>
  );
}

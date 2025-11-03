'use client';

import Image from 'next/image';
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

  const bannerClassName =
    'relative aspect-square w-full overflow-hidden rounded-xl border border-white bg-white/30 [box-shadow:1px_1px_12px_0_rgba(76,25,168,0.12),-4px_-4px_12px_1px_rgba(255,255,255,0.60)_inset]';

  if (linkUrl) {
    return (
      <LocaleLink href={linkUrl} className='block'>
        <div className={bannerClassName}>
          <Image src={imageUrl} alt={imageAlt} fill className='object-cover' />
        </div>
      </LocaleLink>
    );
  }

  return (
    <div className='block'>
      <div className={bannerClassName}>
        <Image src={imageUrl} alt={imageAlt} fill className='object-cover' />
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { useHospitalVideos } from 'entities/hospital/model/useHospitalVideos';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalDetailProceduresImagesSectionProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

const getLocalizedValue = (
  value: Prisma.JsonValue | null,
  lang: Locale,
  fallback?: string | null,
): string | null => {
  const localized = extractLocalizedText(value, lang);
  if (localized && localized.trim() !== '') {
    return localized;
  }
  return fallback ?? null;
};

export function HospitalDetailProceduresImagesSection({
  hospitalId,
  lang,
  dict,
}: HospitalDetailProceduresImagesSectionProps) {
  const { data, isLoading, error } = useHospitalVideos(hospitalId);

  if (isLoading || error || !data || !data.procedures || data.procedures.length === 0) {
    return null;
  }

  const images = data.procedures
    .map((img) => {
      const url =
        getLocalizedValue(img.localizedLinks, lang, img.fallbackUrl) || img.fallbackUrl || null;
      return url
        ? {
            id: img.id,
            url,
            alt: img.alt || dict.hospitalDetailTabs.proceduresDetail,
            order: img.order ?? 0,
          }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.order || 0) - (b!.order || 0)) as {
    id: string;
    url: string;
    alt: string;
    order: number;
  }[];

  if (images.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col space-y-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospitalDetailTabs.proceduresDetail}
      </h2>
      <div className='flex flex-col space-y-3'>
        {images.map((image) => (
          <div
            key={image.id}
            className='relative w-full overflow-hidden rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)]'
          >
            <div className='relative h-[188px] w-full'>
              <Image
                src={image.url || DEFAULT_IMAGES.HOSPITAL_DEFAULT}
                alt={image.alt}
                fill
                sizes='100%'
                className='absolute inset-0 max-w-none object-cover object-center'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = DEFAULT_IMAGES.HOSPITAL_DEFAULT;
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

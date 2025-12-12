'use client';

import Image from 'next/image';
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

export function HospitalDetailProceduresImagesSection({
  hospitalId,
  lang,
  dict,
}: HospitalDetailProceduresImagesSectionProps) {
  const { data, isLoading, error } = useHospitalVideos(hospitalId);

  if (isLoading) {
    return null;
  }

  // 현재 선택된 언어에 맞는 이미지 하나만 선택
  // 여러 이미지가 있으면 order 기준으로 정렬 후 첫 번째 선택
  const currentLanguageImage =
    data?.procedures && data.procedures.length > 0
      ? data.procedures
          .map((img) => {
            // 선택된 언어에 맞는 URL 추출
            const url = extractLocalizedText(img.localizedLinks, lang) || img.fallbackUrl || null;
            return url
              ? {
                  id: img.id,
                  url,
                  alt: img.alt || dict.hospitalDetailTabs.proceduresDetail,
                  order: img.order ?? 0,
                }
              : null;
          })
          .filter(
            (img): img is { id: string; url: string; alt: string; order: number } => img !== null,
          )
          .sort((a, b) => a.order - b.order)[0] // order 기준 정렬 후 첫 번째만 선택
      : null;

  const hasImageData = !!currentLanguageImage;

  return (
    <div className='flex flex-col space-y-3'>
      <h2 className='text-lg leading-7 font-semibold text-neutral-700'>
        {dict.hospitalDetailTabs.proceduresDetail}
      </h2>

      {!hasImageData || error ? (
        <p className='text-sm leading-5 text-neutral-500'>
          {dict.hospitalDetailTabs.proceduresComingSoon}
        </p>
      ) : (
        <div className='relative w-full overflow-hidden rounded-xl'>
          <Image
            src={currentLanguageImage.url || DEFAULT_IMAGES.HOSPITAL_DEFAULT}
            alt={currentLanguageImage.alt}
            width={800}
            height={0}
            style={{ height: 'auto', width: '100%' }}
            className='w-full'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_IMAGES.HOSPITAL_DEFAULT;
            }}
          />
        </div>
      )}
    </div>
  );
}

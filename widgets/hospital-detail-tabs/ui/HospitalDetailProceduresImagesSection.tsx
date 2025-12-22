'use client';

import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { localeToAltValue } from 'shared/lib/localized-text';
import { useHospitalVideos } from 'entities/hospital/model/useHospitalVideos';
import { DEFAULT_IMAGES } from 'shared/config/images';

interface HospitalDetailProceduresImagesSectionProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * localizedLinks에서 현재 언어에 맞는 이미지 URL을 가져오는 헬퍼 함수
 */
function getLocalizedImageUrl(
  localizedLinks: Record<string, string> | null,
  fallbackUrl: string | null,
  locale: Locale,
): string | null {
  const altValue = localeToAltValue(locale);

  if (localizedLinks && typeof localizedLinks === 'object') {
    // localizedLinks에서 현재 언어에 맞는 URL 찾기
    const localizedUrl = localizedLinks[altValue];
    if (localizedUrl) {
      return localizedUrl;
    }
  }

  // localizedLinks가 없거나 현재 언어가 없으면 fallback 사용
  return fallbackUrl;
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

  // procedures 배열에서 order 기준으로 정렬 후 현재 언어에 맞는 이미지 URL 가져오기
  const procedureImages =
    data?.procedures && data.procedures.length > 0
      ? data.procedures
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((img) => ({
            id: img.id,
            url: getLocalizedImageUrl(
              img.localizedLinks as Record<string, string> | null,
              img.fallbackUrl,
              lang,
            ),
            order: img.order,
          }))
          .filter((img) => img.url !== null) // URL이 있는 이미지만 필터링
      : [];

  const hasImageData = procedureImages.length > 0;

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
        <div className='flex flex-col space-y-3'>
          {procedureImages.map((img, index) => (
            <div key={img.id} className='relative w-full overflow-hidden rounded-xl'>
              <Image
                src={img.url || DEFAULT_IMAGES.HOSPITAL_DEFAULT}
                alt={`${dict.hospitalDetailTabs.proceduresDetail} ${index + 1}`}
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
          ))}
        </div>
      )}
    </div>
  );
}

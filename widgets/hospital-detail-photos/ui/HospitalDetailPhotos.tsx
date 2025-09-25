import { type Hospital } from 'entities/hospital/api/entities/types';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { HospitalMainImage } from 'entities/hospital/ui/HospitalMainImage';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { LocaleLink } from 'shared/ui/locale-link';
import { HotLabelVariant } from 'shared/ui/hot-label/HotLabelVariant';

interface HospitalDetailPhotosProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailPhotos({ hospital, lang, dict }: HospitalDetailPhotosProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang) || '병원명 없음';

  return (
    <div className='relative h-[242px] w-full'>
      <HospitalMainImage imageUrl={hospital.mainImageUrl} hospitalName={hospitalName} />

      {/* HotLabelVariant - 왼쪽 위에 위치 */}
      <div className='absolute top-[-7px] left-[13px] z-[60]'>
        <HotLabelVariant />
      </div>

      <LocaleLink
        href={`/hospital/${hospital.id}/reviews`}
        locale={lang}
        className='bg-primary absolute top-5 right-5 flex min-h-[66px] min-w-[66px] items-center justify-center rounded-full'
      >
        <span className='text-[13px] font-semibold text-white'>
          {dict.hospital?.reviewsButton || '시술후기'}
        </span>
      </LocaleLink>
    </div>
  );
}

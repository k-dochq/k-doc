'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type DoctorDetail } from '@/lib/queries/doctor';

interface DoctorCareerV2Props {
  doctor: DoctorDetail;
  lang: Locale;
  dict: Dictionary;
}

export function DoctorCareerV2({ doctor, lang, dict }: DoctorCareerV2Props) {
  // 경력 텍스트 추출 (필리핀어일 때는 영어와 동일하게 표시)
  const doctorCareer = getLocalizedTextByLocale(
    doctor.career,
    lang === 'tl' ? 'en' : lang,
  );

  // 경력 데이터가 없으면 렌더링하지 않음
  if (!doctorCareer) {
    return null;
  }

  return (
    <div className='flex flex-col gap-3 bg-white px-5 py-5'>
      {/* 제목 */}
      <h3 className='text-[18px] leading-[28px] font-semibold text-neutral-700'>
        {dict.doctor.career}
      </h3>

      {/* 경력 텍스트 */}
      <div className='flex flex-col gap-0 rounded-xl bg-neutral-100 p-4'>
        <div
          className='text-[14px] leading-[20px] whitespace-pre-wrap text-neutral-500'
          dangerouslySetInnerHTML={{
            __html: doctorCareer.replace(/\n/g, '<br />'),
          }}
        />
      </div>
    </div>
  );
}

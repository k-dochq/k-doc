import Image from 'next/image';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface AboutPeopleSectionV2Props {
  lang: Locale;
  dict: Dictionary;
}

const PEOPLE_IMAGE_MAP: Record<Locale, string> = {
  ko: '/images/k-doc_make_kr.png',
  en: '/images/k-doc_make_en.png',
  th: '/images/k-doc_make_th.png',
  hi: '/images/k-doc_make_hi.png',
  ja: '/images/k-doc_make_ja.png',
  ru: '/images/k-doc_make_ru.png',
  tl: '/images/k-doc_make_tl.png',
  'zh-Hant': '/images/k-doc_make_zh-Hant.png',
  ar: '/images/k-doc_make_ar.png',
};

function splitDescriptionText(description: { part1: string; highlight: string; part2: string }) {
  const { part1, highlight, part2 } = description;

  const cjkPeriodIdx = part2.indexOf('。');
  const westernPeriodIdx = part2.indexOf('. ');

  let headingEnd = '';
  let bodyText = part2;

  if (cjkPeriodIdx >= 0 && (westernPeriodIdx < 0 || cjkPeriodIdx <= westernPeriodIdx)) {
    headingEnd = part2.slice(0, cjkPeriodIdx + 1);
    bodyText = part2.slice(cjkPeriodIdx + 1).trim();
  } else if (westernPeriodIdx >= 0) {
    headingEnd = part2.slice(0, westernPeriodIdx + 1);
    bodyText = part2.slice(westernPeriodIdx + 2).trim();
  }

  return {
    heading: part1 + highlight + headingEnd,
    bodyText,
  };
}

export function AboutPeopleSectionV2({ lang, dict }: AboutPeopleSectionV2Props) {
  const { subtitle, description } = dict.about;
  const imageSrc = PEOPLE_IMAGE_MAP[lang] ?? '/images/k-doc_make_en.png';
  const { heading, bodyText } = splitDescriptionText(description);

  return (
    <div className='relative overflow-hidden'>
      {/* 그라디언트 배경 블롭 */}
      <div className='pointer-events-none absolute right-[-20px] bottom-[80px] h-[220px] w-[220px] rounded-full bg-[#7657FF]/15 blur-[80px]' />
      <div className='pointer-events-none absolute bottom-[40px] left-[-40px] h-[260px] w-[260px] rounded-full bg-[#0FE5E1]/15 blur-[80px]' />

      <div className='relative flex flex-col gap-6 px-5 pt-14'>
        {/* 섹션 레이블 */}
        <p className='text-base font-bold leading-6 text-neutral-400'>{subtitle}</p>

        {/* 헤딩 */}
        <p className='text-2xl font-bold leading-8 text-neutral-700'>{heading}</p>

        {/* 본문 */}
        {bodyText && (
          <p className='text-base font-normal leading-6 text-neutral-500'>{bodyText}</p>
        )}

        {/* 팀 이미지 */}
        <div className='relative aspect-[936/640] w-full'>
          <Image
            src={imageSrc}
            alt='K-DOC Team'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
}

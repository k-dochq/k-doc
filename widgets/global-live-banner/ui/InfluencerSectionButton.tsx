'use client';

import { type Locale } from 'shared/config';
import { useInfluencerVideoSection } from 'features/influencer-videos';

interface InfluencerSectionButtonProps {
  lang: Locale;
}

function getLocaleKey(lang: Locale): string {
  return lang === 'zh-Hant' ? 'zh' : lang;
}

export function InfluencerSectionButton({ lang }: InfluencerSectionButtonProps) {
  const { data: section } = useInfluencerVideoSection();

  if (!section) return null;

  const key = getLocaleKey(lang);
  const label = section.buttonLabel[key];
  const url = section.buttonUrl[key];

  return (
    <div className='mt-10 w-full px-5'>
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex w-full items-center justify-center rounded-xl bg-[#7657FF] px-5 py-4'
      >
        <span className='text-base font-medium leading-6 text-white'>{label}</span>
      </a>
    </div>
  );
}

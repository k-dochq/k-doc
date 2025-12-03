'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { YoutubeVideosTitleV2 } from './YoutubeVideosTitleV2';
import { YoutubeVideoFilterTabsV2 } from './YoutubeVideoFilterTabsV2';
import { YoutubeVideosCarouselV2Wrapper } from './YoutubeVideosCarouselV2Wrapper';

interface YoutubeVideosV2ContainerProps {
  lang: Locale;
  dict: Dictionary;
}

export function YoutubeVideosV2Container({ lang, dict }: YoutubeVideosV2ContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <YoutubeVideosTitleV2 lang={lang} dict={dict} />
      <div className='h-4' />
      <YoutubeVideoFilterTabsV2
        lang={lang}
        dict={dict}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className='h-4' />
      <YoutubeVideosCarouselV2Wrapper lang={lang} dict={dict} selectedCategory={selectedCategory} />
    </>
  );
}

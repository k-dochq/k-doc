import { type Locale } from 'shared/config';
import { PICK_YOUR_GIFT_SECTIONS } from '../model/sections';
import { getSectionImageSrc } from '../lib/image-path';
import { EventSectionImage } from './EventSectionImage';

export interface PickYourGiftSectionsProps {
  lang: Locale;
}

/** 언어별 섹션 이미지를 순서대로 세로 조립한다. */
export function PickYourGiftSections({ lang }: PickYourGiftSectionsProps) {
  return (
    <>
      {PICK_YOUR_GIFT_SECTIONS.map((section, index) => (
        <EventSectionImage
          key={section.id}
          src={getSectionImageSrc(lang, section.id)}
          alt={section.alt}
          width={section.width}
          height={section.height}
          priority={index === 0}
        />
      ))}
    </>
  );
}

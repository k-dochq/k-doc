import { type Locale } from 'shared/config';

import { getSectionImageSrc } from '../lib/image-path';
import { getSectionSizes } from '../lib/section-sizes';
import { SECTION_ALTS, SECTION_IDS } from '../model/sections';
import { EventSectionImage } from './EventSectionImage';

export interface FreeGreatGiftSectionsProps {
  lang: Locale;
}

/**
 * 섹션 이미지를 순서대로 쌓는다.
 *
 * 크기는 서버에서 실제 파일을 읽어 넘긴다(언어마다 높이가 다르다). 이미지 경로도 현재 언어 폴더만
 * 가리키므로, 브라우저가 내려받는 것은 선택된 언어의 4장뿐이다.
 */
export async function FreeGreatGiftSections({ lang }: FreeGreatGiftSectionsProps) {
  const sizes = await getSectionSizes(lang);

  return (
    <>
      {SECTION_IDS.map((id, index) => (
        <EventSectionImage
          key={id}
          src={getSectionImageSrc(lang, id)}
          alt={SECTION_ALTS[index]}
          width={sizes[index].width}
          height={sizes[index].height}
          priority={index === 0}
        />
      ))}
    </>
  );
}

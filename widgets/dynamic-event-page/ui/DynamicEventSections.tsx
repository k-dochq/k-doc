import { type Locale } from 'shared/config';
import { EventSectionImage } from 'shared/ui/event-section-image';
import { type ActiveEventPage } from 'entities/event-page';

import { toDbLocale } from '../lib/locale';

interface DynamicEventSectionsProps {
  eventPage: ActiveEventPage;
  lang: Locale;
}

/**
 * 어드민에서 등록한 언어별 통이미지를 순서대로 쌓는다.
 *
 * 현재 언어 이미지가 없으면 영어로 폴백한다. width/height 는 업로드 시점에 기록된
 * 원본 크기라, 로드 전에도 자리가 잡혀 레이아웃 시프트가 없다.
 */
export function DynamicEventSections({ eventPage, lang }: DynamicEventSectionsProps) {
  const dbLocale = toDbLocale(lang);
  const own = eventPage.images.filter((img) => img.locale === dbLocale);
  const images = own.length > 0 ? own : eventPage.images.filter((img) => img.locale === 'en');

  return (
    <>
      {images.map((img, index) => (
        <EventSectionImage
          key={img.id}
          src={img.imageUrl}
          alt={`Event section ${index + 1}`}
          width={img.width}
          height={img.height}
          priority={index === 0}
        />
      ))}
    </>
  );
}

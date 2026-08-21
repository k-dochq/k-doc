import { notFound } from 'next/navigation';
import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { getActiveEventPage } from 'entities/event-page';
import {
  DynamicEventFloatingButton,
  DynamicEventSections,
  pickLocalizedText,
} from 'widgets/dynamic-event-page';

/** 어드민 수정이 바로 반영되어야 하므로 항상 요청 시점에 렌더한다 */
export const dynamic = 'force-dynamic';

interface DynamicEventPageProps {
  params: Promise<{ lang: Locale; eventSlug: string }>;
}

export default async function DynamicEventPage({ params }: DynamicEventPageProps) {
  const { lang, eventSlug } = await params;
  const eventPage = await getActiveEventPage(eventSlug);

  if (!eventPage || eventPage.images.length === 0) {
    notFound();
  }

  const title = pickLocalizedText(eventPage.title, lang);
  const buttonText = pickLocalizedText(eventPage.buttonText, lang);

  return (
    <div>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/main`} />
      {/* 고정 헤더 높이만큼 여백 */}
      <div className='h-[58px]' />
      <DynamicEventSections eventPage={eventPage} lang={lang} />
      {buttonText && buttonLink(eventPage) && (
        <DynamicEventFloatingButton label={buttonText} link={eventPage.buttonLink} lang={lang} />
      )}
    </div>
  );
}

function buttonLink(page: { buttonLink: string }) {
  return page.buttonLink.trim();
}

'use client';

import Image from 'next/image';
import { LocaleLink } from 'shared/ui/locale-link';
import { type Prisma } from '@prisma/client';
import { getLocalizedTitle } from '../model/types';
import { type Locale } from 'shared/config';

export interface EventBannerRibbonItemProps {
  id: string;
  title: Prisma.JsonValue;
  linkUrl: string | null;
  imageUrl: string;
  alt: string | null;
  currentLocale: 'ko' | 'en' | 'th';
}

/**
 * URL에 locale을 추가하는 유틸리티 함수
 * 같은 도메인의 전체 URL인 경우 경로에 locale을 추가
 */
function addLocaleToUrl(url: string, locale: Locale): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // 같은 도메인인지 확인 (www.k-doc.kr 또는 k-doc.kr)
    const isSameDomain =
      hostname === 'www.k-doc.kr' ||
      hostname === 'k-doc.kr' ||
      hostname === 'localhost' ||
      hostname.includes('localhost');

    if (!isSameDomain) {
      return url; // 외부 도메인은 그대로 반환
    }

    const pathname = urlObj.pathname;
    const supportedLocales: Locale[] = ['en', 'ko', 'th'];

    // 이미 locale이 경로에 포함되어 있는지 확인
    const pathParts = pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0];

    if (firstPart && supportedLocales.includes(firstPart as Locale)) {
      return url; // 이미 locale이 있으면 그대로 반환
    }

    // locale을 경로 앞에 추가
    const newPathname = `/${locale}${pathname}`;
    urlObj.pathname = newPathname;

    return urlObj.toString();
  } catch {
    // URL 파싱 실패 시 원본 반환
    return url;
  }
}

export function EventBannerRibbonItem({
  linkUrl,
  imageUrl,
  alt,
  title,
  currentLocale,
}: EventBannerRibbonItemProps) {
  const localizedTitle = getLocalizedTitle(title, currentLocale);
  const imageAlt = alt || localizedTitle || 'Event Banner';

  const bannerClassName = 'relative w-full aspect-[375/80] overflow-hidden';

  if (linkUrl) {
    // 전체 URL인 경우 locale 추가 처리
    const processedLinkUrl =
      linkUrl.startsWith('http') || linkUrl.startsWith('https')
        ? addLocaleToUrl(linkUrl, currentLocale)
        : linkUrl;

    return (
      <LocaleLink href={processedLinkUrl} locale={currentLocale} className='block'>
        <div className={bannerClassName}>
          <Image src={imageUrl} alt={imageAlt} fill sizes='500px' className='object-cover' />
        </div>
      </LocaleLink>
    );
  }

  return (
    <div className='block'>
      <div className={bannerClassName}>
        <Image src={imageUrl} alt={imageAlt} fill sizes='500px' className='object-cover' />
      </div>
    </div>
  );
}

'use client';

import type { MarketingAttribution } from './types';

/**
 * URLSearchParams에서 UTM 파라미터 5종을 추출합니다.
 * @param searchParams URLSearchParams 객체
 * @returns UTM 파라미터 객체
 */
export function parseUTMParams(searchParams: URLSearchParams): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
} {
  return {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_content: searchParams.get('utm_content'),
    utm_term: searchParams.get('utm_term'),
  };
}

/**
 * document.referrer를 반환합니다.
 * @returns referrer URL 또는 null
 */
export function getReferrer(): string | null {
  if (typeof document === 'undefined') return null;

  const referrer = document.referrer;
  return referrer && referrer.trim() !== '' ? referrer : null;
}

/**
 * 현재 랜딩 URL을 반환합니다.
 * @returns 현재 URL 전체
 */
export function getLandingUrl(): string | null {
  if (typeof window === 'undefined') return null;

  return window.location.href;
}

/**
 * 현재 URL과 document 정보를 기반으로 MarketingAttribution 객체를 생성합니다.
 * @returns MarketingAttribution 객체
 */
export function createMarketingAttribution(): MarketingAttribution {
  const searchParams = new URLSearchParams(window.location.search);
  const utmParams = parseUTMParams(searchParams);
  const referrer = getReferrer();
  const landingUrl = getLandingUrl();
  const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp (초 단위)

  return {
    ...utmParams,
    referrer,
    landing_url: landingUrl,
    ts: timestamp,
  };
}

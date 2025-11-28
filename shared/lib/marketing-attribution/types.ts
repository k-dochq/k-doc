/**
 * 마케팅 어트리뷰션 데이터 타입 정의
 */

export interface MarketingAttribution {
  /** 트래픽 소스 (예: google, facebook) */
  utm_source: string | null;
  /** 매체 (예: cpc, banner, referral) */
  utm_medium: string | null;
  /** 캠페인명 (예: winter_sale) */
  utm_campaign: string | null;
  /** 소재/광고 그룹 (예: keyword1, bannerA) */
  utm_content: string | null;
  /** 키워드 (예: plastic_surgery) */
  utm_term: string | null;
  /** 이전 페이지 URL (예: https://www.facebook.com) */
  referrer: string | null;
  /** 최초 랜딩 URL (예: https://k-doc.kr?utm_source=google) */
  landing_url: string | null;
  /** 최초 접속 시간 (Unix timestamp, 초 단위) */
  ts: number;
}
